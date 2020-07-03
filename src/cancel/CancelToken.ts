import { CancelExcutor, CancelTokenSource, Canceler } from "../types";
// 注意: Cancel当作值使用; 类可以当作值也可以当作类型
import Cancel from "./cancel"

interface ResolvePromise {
  (message?: Cancel): void
}

export default class CancelToken{
  promise: Promise<Cancel>;
  reason?: Cancel;
  constructor(excutor: CancelExcutor){
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve;
    })
    excutor(message => {
      if(this.reason) {
        return
      }
      this.reason = new Cancel(message);
      resolvePromise(this.reason)
    })
  }
  throwIfRequested():void {
    if(this.reason){
      throw this.reason
    }
  }
  static source(): CancelTokenSource{
    let cancel!: Canceler
    const token = new CancelToken(function (c){
      cancel = c;
    })
    return {
      token,
      cancel
    }
  }
}
