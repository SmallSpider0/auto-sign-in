import plugin from '../../../lib/plugins/plugin.js'
import MysSign from '../model/mysSign.js'
import gsCfg from '../../genshin/model/gsCfg.js'

gsCfg.cpCfg('mys', 'set')

export class dailyNote extends plugin {
  constructor () {
    super({
      name: '签到',
      dsc: '米游社签到',
      event: 'message',
      priority: 300,
      rule: [
        // {
        //   reg: '^(#签到|#*米游社(自动)*签到)(force)*$',
        //   fnc: 'sign'
        // },
        {
          reg: '^#(全部签到|签到任务)(force)*$',
          permission: 'master',
          fnc: 'signTask'
        },
        {
          reg: '^#*(开启|关闭|取消)(米游社|自动|原神)*签到$',
          fnc: 'signClose'
        }
      ]
    })

    this.set = gsCfg.getConfig('mys', 'set')

    /** 定时任务 */
    this.task = {
      cron: this.set.signTime,
      name: '米游社原神签到任务',
      fnc: () => this.signTask()
    }
  }


  /** 签到任务 */
  async signTask () {
    let mysSign = new MysSign(this.e)
    await mysSign.signTask(!!this?.e?.msg)
  }

  // async signClose () {
  //   let mysSign = new MysSign(this.e)
  //   await mysSign.signClose()
  // }
}
