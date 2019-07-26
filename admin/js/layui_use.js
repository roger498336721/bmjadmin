
// layui_use(data,url,delete_url,edit_url)列表页面的layui数据表格  
//data表头数据 url list的url delete——url  edit_url 编辑
//add(url)  url页面添加数据需要的接口地址
//edit(url) 编辑页面
function layui_use(data,url,delete_url,edit_url){
    layui.use('table', function () {
        var table = layui.table;
        // console.log(res)
        table.render({
            
            cols: [[
                {field:'id', title:'ID', width:100}
                ,{fixed: 'right', width:150, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
        });
        table.render({
            elem: '#demo',
            height: 500,
            url: API + url //数据接口
                ,
            request: {
                pageName: 'pageNum' //页码的参数名称，默认：page
                ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
            },
                method:"post"
                ,
            page: true //开启分页
                ,
            

            parseData: function (res) { //res 即为原始返回的数据
            // console.log(res)
            $('#num').text(res.data.total)
                return {
                    "code": res.code, //解析接口状态
                    "msg": res.msg, //解析提示文本
                    "count": res.data.total, //解析数据长度
                    "data": res.data.list ,//解析数据列表
                    'pageNum':res.data.pageNum,
                    'pageSize':res.data.pageSize,
                };
            },

            cols: data,
            done: function(res, curr, count){
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            // console.log(res);
            
            //得到当前页码
            // console.log(curr); 
            
            //得到数据总量
            // console.log(count);
        }
        
        });
       
        table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        // console.log(obj.data)
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if(layEvent === 'detail'){ //查看
            //do somehing
        } else if(layEvent === 'del'){ //删除
            layer.confirm('真的删除么', function(index){
            obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
            layer.close(index);
            //向服务端发送删除指令
                $.ajax({
                    url: API + delete_url,
                    type:"post",
                    data:{
                        'id':data.id
                    },
                    success: function(data){
                    layer.msg(data.msg,{icon:1,time:1000});
                },
                })
            });
        } else if(layEvent === 'edit'){ //编辑
            layer.open({
                type:2
                ,title: false //不显示标题栏
                ,closeBtn: true
                ,area:  ['80%', '90%']
                ,shade: 0.8
                ,content: edit_url+data.id
            })
            //同步更新缓存对应的值
            obj.update({
            
                
            });
        }
        });
    });
    
}
function add(url){
    layui.use(['form', 'layedit', 'laydate'], function () {
        var form = layui.form,
            layer = layui.layer
        form.on('submit(demo1)', function (data) {
            console.log(data.field)
            $.ajax({
                url: API + url,
                type: "post",
                data: data.field,
                success: function (e) {
                    if (e.code == 0) {
                        layer.msg(e.msg, {
                            icon: 6
                        })
                    }
                }
            })
        })
    })
}



function edit(url){
    layui.use(['form', 'layedit', 'laydate'], function () {
        var form = layui.form,
            layer = layui.layer

        form.on('submit(demo1)', function (data) {
            console.log(data.field)
            $.ajax({
                url: API + url,
                type: "post",
                data: data.field,
                success: function (e) {
                    if (e.code == 0) {
                        layer.msg(e.msg, {
                            icon: 6
                        })
                    }
                }
            })
        })
    })

}