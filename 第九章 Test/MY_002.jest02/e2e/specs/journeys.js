module.exports = {
    // "sanity test": function (browser) {
    //     browser
    //         .url("http://localhost:8080")
    //         .waitForElementVisible(".routerABtn", 2000)
    //         .click(".routerABtn")
    //         .assert.urlContains("/RouterA")
    //         .waitForElementVisible(".componentRouterA", 2000)
    //         .end();
    // },
    "page text correctly": function (browser) {
        let temp;
        browser
            .url("http://localhost:8080")
            .waitForElementVisible(".componentChild", 2000)
            .click(".childVisibleBtn")
            .waitForElementVisible(".childText", 2000)
            .getText(".childText", (result) => {
                // console.log(result)
                temp = result.value
            })
            .click(".childTextBtn")
            .perform(() => {
                browser.expect.element(".childText").text.to.not.equal(temp)
            })
            .click(".childTextBtn")
            .perform(() => {
                browser.expect.element(".childText").text.to.not.equal(temp)
            })
            .end();
    }
}

// waitForElementVisible: 等待元素显示
// waitForElementNotPresent: 等待元素不再出现
// perform是一个命令，提供一个回调来执行命令(在里面写一些js代码)