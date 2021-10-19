module.exports = {
    src_folders: ["e2e/specs"], // 防止测试文件的目录
    output_folder: "e2e/reports", // Nightwatch输出测试报告的目录
    selenium: {
        start_process: true,
        // Selenium Server二进制文件路劲，该路径被npm包Selenium Server输出出来
        server_path: require("selenium-server").path,
        host: "127.0.0.1",
        port: 4444,
        cli_args: {
            // 设置Nightwatch以使用ChromeDriver路径启动Selenium进程
            'WebDriver.chrome.driver': require("chromedriver").path,
            // 'WebDriver.gecko.driver': require("geckodriver").path
        },
    },
    // chrome测试环境的设置。测试环境是通过把 --env 参数传递给Nightwatch来配置的
    test_settings: {
        chrome: {
            desiredCapabilities : {
                browserName : 'chrome',
                chromeOptions: {
                    w3c: false
                }
            }
        },
firefox: {
    "desiredCapabilities": {
        "browserName": "firefox",
        "javascriptEnabled": true,
        "acceptSslCerts": true
    }
}
    }
}

// Nightwatch是一个自动运行浏览器的JavaScript框架,在底层，
// Nightwatch使用WebDriver来控制浏览器

// 1.安装Nightwatch和selenium-server
// npm install --save-dev nightwatch selenium-server    // nightwatch向selenium-server发送请求，selenium-server向浏览器转发以实现操作(点击元素)
// npm install --save-dev chromedriver                  // chrome驱动,被selenium-server使用,以便在不同浏览器执行测试的程序; 版本要对应浏览器版本

// 2.配置Nightwatch (见e2e/nightwatch.cof.js)

// 3.package.json添加测试命令
// "test:e2e": "nightwatch --config e2e/nightwatch.cof.js --env chrome"
// "test": "npm run lint && npm run test:unit && npm run test:e2e"  (加上test:e2e)

// 4.添加测试用例

// 5.要在不同终端跑下面命令
// npm run build
// npm run start
// npm run test:e2e

// 6.以上需要手动启动端到端测试，下面写一个自动启动脚本
