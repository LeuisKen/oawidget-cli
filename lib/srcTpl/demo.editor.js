/**
 * @file ${cmptName} editor
 * @author ${yourName}(${yourName}@baidu.com)
 */

export default {
    name: '${cmptName}',
    // 必填! 组件中文名称
    displayName: '',
    // 必填! 截取组件375*667(iphone6)预览图,
    // 上传至http://cms.m.baidu.com/pocms/icms/index
    // 填写图片自适应协议地址 //xxx
    imgViewSrc: '',
    // 必填! 公用组件填1, 其他组件请改为2
    type: 2,
    propertiesGroup: [
/* Replace It !! 写下你的组件配置
        {
            text: '布局',
            properties: [
                {
                    name: 'width',
                    text: '宽度',
                    type: 'number',
                    unit: 'px',
                    value: 20
                },
                {
                    name: 'height',
                    text: '高度',
                    type: 'number',
                    unit: 'px',
                    value: 80
                }
            ]
        },
        {
            text: '样式',
            properties: [
                {
                    name: 'backgroundImage',
                    text: '背景图',
                    type: 'image',
                    value: ''
                }
            ]
        },
        {
            text: '事件',
            properties: [
                {
                    name: 'hrefType',
                    text: '跳转方式',
                    type: 'select',
                    items: [
                        {label: '链接跳转', value: 'openUrl'},
                        {label: '调起AR', value: 'openAr'},
                        {label: '调起手百', value: 'openShoubai'},
                        {label: '调起手助', value: 'openShouzhu'}
                    ],
                    value: 'openUrl',
                    descr: '跳转到哪'
                },
                {
                    name: 'href',
                    text: '跳转',
                    type: 'text',
                    value: '',
                    descr: '跳转到哪'
                },
                {
                    name: 'click',
                    text: '点击时',
                    type: 'action',
                    value: ''
                },
                {
                    name: 'log',
                    text: '点击log',
                    type: 'text',
                    value: ''
                }
            ]
        }
*/
    ]
};
