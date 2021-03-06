import { Expression } from '../../render/expression'
import { Context } from '../../context/context'
import { isArray, identify } from '../../util/underscore'
import { FilterImplOptions } from './filter-impl-options'

type KeyValuePair = [string?, string?]
type FilterArg = string|KeyValuePair
export type FilterArgs = FilterArg[]

export class Filter {
  public name: string
  public args: FilterArgs
  private impl: FilterImplOptions
  private static impls: {[key: string]: FilterImplOptions} = {}

  public constructor (name: string, args: FilterArgs, strictFilters: boolean) {
    const impl = Filter.impls[name]
    if (!impl && strictFilters) throw new TypeError(`undefined filter: ${name}`)

    this.name = name
    this.impl = impl || identify
    this.args = args
  }
  public * render (value: any, context: Context) {
    const argv: any[] = []
    for (const arg of this.args) {
      if (isKeyValuePair(arg)) argv.push([arg[0], yield new Expression(arg[1]).evaluate(context)])
      else argv.push(yield new Expression(arg).evaluate(context))
    }
    return this.impl.apply({ context }, [value, ...argv])
  }
  public static register (name: string, filter: FilterImplOptions) {
    Filter.impls[name] = filter
  }
  public static clear () {
    Filter.impls = {}
  }
}

function isKeyValuePair (arr: FilterArg): arr is KeyValuePair {
  return isArray(arr)
}
