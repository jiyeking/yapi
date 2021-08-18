const Safeify = require('safeify').default;

module.exports = async function sandboxFn(context, script) {
    // 创建 safeify 实例
    const safeVm = new Safeify({
        timeout: 3000,
        asyncTimeout: 60000,
        unrestricted: true  // 解决在镜像中启动服务报错：Error: EROFS: read-only file system, mkdir '/sys/fs/cgroup/cpu/safeify'
    })

    // 执行动态代码
    const result = await safeVm.run(script, context)

    // 释放资源
    safeVm.destroy()
    return result
}
