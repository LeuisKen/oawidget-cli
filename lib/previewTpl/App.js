/**
 * @file 预览入口文件
 * @author X-Jray(z.xuanjian@gmail.com)
*/

import oapAppEntry from '@baidu/oap-app-entry';

import ${cmptName} from '../src/${cmptName}';

export default oapAppEntry({
    template: `
        <section>
            <${cmptTagName} props="{{props}}"></${cmptTagName}>
        </section>
    `,
    initData() {
        return {
            /* TO BE REPLACED */
            props: {name: 'oawidget'}
            /* TO BE REPLACED */
        }
    },
    components: {
        '${cmptTagName}': ${cmptName}.widget
    }
});
