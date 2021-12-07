(function () {
    // rem适配，html跟字体的大小
    // 核心：设备宽 / 80
    let setFont = function () {
        // 获取html
        let html = document.documentElement;// document.querySelector('html');
        // 获取宽度
        let width = html.clientWidth;
        // 判断
        if ( width <= 1024 ) width = 1024;
        if ( width >= 1920 ) width = 1920;
        // 计算跟字体大小
        let fontSize = width / 80 + 'px';
        // 设置给html
        html.style.fontSize = fontSize;
    }
    setFont();
    // 设备窗口尺寸发生改变：resize
    window.addEventListener('resize', function () {
        setFont();
    });
})();
// 监控区域功能
(function () {
    // 1、切换功能
    $('.monitor').on('click', '.tabs a', function () {
        // 点击哪个a给哪个a添加类名
        $(this).addClass('active').siblings().removeClass('active');
        // 获取自定义属性
        let index = $(this).data('index');
        // 显示content
        $('.content').eq(index).show().siblings('.content').hide();
    });
    // 2、轮播功能
    // 克隆数据，用css完成动画
    $('.marquee').each(function () {
        // 克隆marquee里面的div
        let lis = $(this).children().clone();
        // 放到marquee
        $(this).append(lis);
    });
})();
// 点位区域
(function () {
    // 1、实例化
    let myChart = echarts.init( $('.pie')[0] );
    // 2、准备配置项
    let option = {
        tooltip: {
            trigger: 'item',// item图形提示
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color : ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: ['10%','70%'],
                center: ['50%', '50%'],
                label : {
                    fontSize : 10,
                },
                labelLine : {
                    length : 8,
                    length2 : 10,
                },
                roseType: 'radius',
                data: [
                    { value: 20, name: '云南' },
                    { value: 26, name: '北京' },
                    { value: 24, name: '山东' },
                    { value: 25, name: '河北' },
                    { value: 20, name: '江苏' },
                    { value: 25, name: '浙江' },
                    { value: 30, name: '四川' },
                    { value: 42, name: '湖北' }
                ]
            }
        ]
    };
    // 3、设置配置项
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();
// 用户柱状图
(function () {
    // 1、实例化
    let myChart = echarts.init( $('.bar')[0] );
    // 定义一个对象：
    let item  = {
        value : 1200,
        itemStyle : {
            color : '#254065'
        },
        tooltip : {
            // 1、show：false
            // 2、extraCssText；额外的css样式
            extraCssText : 'opacity : 0',
        },
        // 高亮图形样式
        emphasis : {
            itemStyle : {
                color : '#254065'
            }
        }
    }
    // 2、准备配置项
    let option = {
        tooltip: {
            trigger: 'item',
            // 控制触发效果
            // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            //     type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            // }
        },
        grid: {
            top : '3%',
            left: '0%',
            right: '3%',
            bottom: '3%',
            containLabel: true,
            show : true,
            borderColor : 'rgba(0, 240, 255, 0.3)',
        },
        xAxis: [
            {
                type: 'category',
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                // 隐藏刻度
                axisTick: {
                    alignWithLabel: false,
                    show : false,
                },
                axisLabel : {
                    color : '#4c9bfd',
                }
               
            }
        ],
        yAxis: [
            {
                type: 'value',
                // 隐藏刻度
                axisTick: {
                    alignWithLabel: false,
                    show : false,
                },
                // label颜色
                axisLabel : {
                    color : '#4c9bfd',
                },
                splitLine : {
                    lineStyle : {
                        color : 'rgba(0, 240, 255, 0.3)',
                    }
                }
            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: [2100,1900,1700,1560,1400,item,item,item,900,750,600,480,240],
                // 图形样式，
                itemStyle : {
                    color : new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: 'red'},// 起始位置
                            {offset: 1, color: 'blue'}// 结束位置
                        ]
                    ),
                }
            }
        ]
    };
    // 3、设置配置项
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();
// 订单区域功能
(function () {
    // 数据
    var data = {
        day365: { orders: '20,301,987', amount: '99834' },
        day90: { orders: '301,987', amount: '9834' },
        day30: { orders: '1,987', amount: '3834' },
        day1: { orders: '987', amount: '834' }
      }
    // 切换思路：点a的时候，获取a的自定义属性，根据自定义属性可以找到对应的数据，把数据放到对应h4
    // 1、点击切换
    $('.order .filter a').on('click', function () {
        // 添加类名
        $(this).addClass('active').siblings().removeClass('active');
        // 获取自定义属性
        let key = $(this).data('key');
        // 找到对应的数据
        let currentData = data[key];
        // 放到对应的h4
        $('.order .data h4').eq(0).text( currentData['orders'] );
        $('.order .data h4').eq(1).text( currentData['amount'] );
    });
    // 2、自动切换
    // 定时器
    // 我们只需要每隔几秒让其中某个a，自动触发点击事件
    // 我们初始化定义一个索引值，初始值为0，每隔5秒让索引值增1，根据索引值找到对应a，自动触发点击
    let index = 0;
    window.setInterval(function () {
        // 让索引值自增
        index++;
        // 判断
        if ( index > 3 ) index = 0;
        // 找到a自动触发点击事件
        $('.order .filter a').eq(index).trigger('click');
    }, 5000);
})();
// 销售区域
(function () {
    // 1、实例化
    let myChart = echarts.init( $('.line')[0] );
    // 2、准备配置项
    let option = {
        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            boundaryGap : false,
            // 清除刻度线
            axisTick : {
                show : false,
            },
            // label颜色
            axisLabel : {
                color : '#4c9bfd',
            },
            axisLine : {
                show : false,
            }
        },
        yAxis: {
            type: 'value',
             // 清除刻度线
            axisTick : {
                show : false,
            },
            // label颜色
            axisLabel : {
                color : '#4c9bfd',
            },
            splitLine : {
                lineStyle : {
                    color : '#012f4a',
                }
            }
        },
        grid : {
            show : true,
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel : true,
            borderColor : '#012f4a',
        },
        // 注意：legend：必须有name才可以
        legend : {
            data : ['预期销售额', '实际销售额'],
            textStyle : {
                color : '#4c9bfd',
            },
            right : '10%',
        },
        tooltip : {
            trigger : 'axis',
        },
        series: [{
            name : '预期销售额',
            data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            type: 'line',
            smooth: true,
            itemStyle : {
                color : '#00f2f1',
            }
        },{
            name : '实际销售额',
            data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
            type: 'line',
            smooth: true,
            itemStyle : {
                color : '#ed3f35',
            }
            
        }]
    };
    // 3、设置配置项
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
    

    // 功能
    var data = {
        year: [
          [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
          [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
          [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
          [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
          [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
          [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
          [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
          [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    // 思路：a标签的自定义属性，就是data里面的键，通过键找到对应的数据，放到series的对象中
    $('.sales .caption a').on('click', function () {
        // 添加类名
        $(this).addClass('active').siblings().removeClass('active');
        // 获取a的自定义属性
        let type = $(this).data('type');
        // 通过type这个键可以找到对应的数据
        let currentDate = data[type];
        // 设置数据
        option.series[0].data = currentDate[0];
        option.series[1].data = currentDate[1];
        // 重新设置配置项
        myChart.setOption(option);
    });

    // 定时器
    // $('.sales .caption a')其中之一自动触发点击事件
    let index = 0;
    let timer = window.setInterval(function () {
        // 索引值增加
        index++;
        // 判断
        if ( index > 3 ) index = 0;
        // 根据索引值找到对应的a自动触发点击事件
        $('.sales .caption a').eq(index).trigger('click');
    }, 1000);
    // 鼠标经过要停止轮播
    $('.sales .chart').mouseenter( function () {
        // 清除定时器
        window.clearInterval(timer);
    } ).mouseleave(function () {
        timer = window.setInterval(function () {
            // 索引值增加
            index++;
            // 判断
            if ( index > 3 ) index = 0;
            // 根据索引值找到对应的a自动触发点击事件
            $('.sales .caption a').eq(index).trigger('click');
        }, 1000);
    });
})();
// 渠道进度
(function () {
    // 1、实例化
    let myChart = echarts.init( $('.gauge')[0] );
    // 2、准备配置项
    let option = {
        series: [
            { 
                name: '访问来源',
                type: 'pie',
                radius: ['130%', '150%'],
                center: ['48%', '80%'],
                labelLine: {
                    show: false
                },
                startAngle : 180,
                hoverOffset : 0,
                data: [
                    {
                        value: 100, 
                        itemStyle : {
                            color : new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#00c9e0'},// 起始位置
                                    {offset: 1, color: '#005fc1'}// 结束位置
                                ]
                            ),
                        }
                    },
                    {value: 100, itemStyle : {color : '#12274d'}},
                    {value: 200,itemStyle : { color : 'transparent' }}
                ]
            }
        ]
    };
    // 3、设置配置项
    myChart.setOption(option);
})();
// 热销排行榜
( function () {
    var data = [
        { name: '可爱多', num: '9,086' },
        { name: '娃哈哈', num: '8,341' },
        { name: '喜之郎', num: '7,407' },
        { name: '八喜', num: '6,080' },
        { name: '小洋人', num: '6,724' },
        { name: '好多鱼', num: '2,170' },
    ];
    // <li><span>对象.name</span><span>对象.num<s class="icon-up"></s></span></li>
    // 我们随机打乱数组的顺序，之后把数组的对象对应的放到li中，最后放到页面中
    
    // 事件
    $('.province .sup li').on('mouseenter', function () {
        // 类名操作
        $(this).addClass('active').siblings().removeClass('active');
        // 1、打乱数组顺序
        let randomDate = data.sort( function () { return 0.5 - Math.random() } );
        // 2、遍历数组
        let html = ``;
        randomDate.forEach( (item) => {
            // console.log(item);
            html = html + `<li>
                            <span>${item.name}</span>
                            <span>${item.num}<s class="icon-up"></s></span>
                        </li>`;
        } );
        // 3、放到sub中
        $('.province .sub').html(html);
    });

    // 默认让第一个显示，只要让第一个li自动触发事件
    $('.province .sup li').eq(0).trigger('mouseenter');

    // 自动轮播
    let index = 0;
    window.setInterval(function () {
        // 让索引值增加
        index++;
        // 判断
        if ( index >= 5 ) index = 0;
        // 根据索引值查找指定的li，自动触发事件
        $('.province .sup li').eq(index).trigger('mouseenter');
    }, 2000);
} )();