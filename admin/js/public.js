
function admin_add(title, url) {
    layer.open({
        type: 2,
        title: title, //layer mobile页
        shadeClose: true,
        shade: 0.8,
        area: ['80%', '90%'],
        content: url, //iframe的url			});
    })
}
