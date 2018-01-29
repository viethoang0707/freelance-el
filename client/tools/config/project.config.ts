import { join } from 'path';

import { SeedConfig } from './seed.config';
// import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

    PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

    FONTS_DEST = `${this.APP_DEST}/fonts`;
    FONTS_SRC = ['node_modules/font-awesome/fonts/**'];

    PRIME_NG_THEME = 'cupertino';
    CSS_IMAGE_DEST = `${this.CSS_DEST}/images`;
    CSS_IMAGE_SRC = [
        'node_modules/primeng/resources/themes/' + this.PRIME_NG_THEME + '/images/**'
    ];

    THEME_FONTS_DEST = `${this.APP_DEST}/css/fonts`;
    THEME_FONTS_SRC = [
        'node_modules/primeng/resources/themes/' + this.PRIME_NG_THEME + '/fonts/**',
    ];

    constructor() {
        super();
        this.APP_TITLE = 'e-Learning';
        // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

        /* Enable typeless compiler runs (faster) between typed compiler runs. */
        // this.TYPED_COMPILE_INTERVAL = 5;

        // Add `NPM` third-party libraries to be injected/bundled.
        this.NPM_DEPENDENCIES = [
            ...this.NPM_DEPENDENCIES,
            { src: 'jquery/dist/jquery.min.js', inject: true },
            { src: 'primeng/resources/primeng.css', inject: true },
            { src: `primeng/resources/themes/${this.PRIME_NG_THEME}/theme.css`, inject: true },
            { src: 'font-awesome/css/font-awesome.css', inject: true },
            { src: 'nanoscroller/bin/css/nanoscroller.css', inject: true },
            { src: 'nanoscroller/bin/javascripts/jquery.nanoscroller.js', inject: true },
            { src: 'chart.js/dist/Chart.bundle.min.js', inject: true },
            { src: 'moment/min/moment.min.js', inject: true },
            { src: 'fullcalendar/dist/fullcalendar.js', inject: true },
            { src: 'fullcalendar/dist/fullcalendar.min.css', inject: true },
            { src: 'fullcalendar/dist/fullcalendar.print.css', inject: true },
            { src: 'fullcalendar/dist/gcal.min.js', inject: true },
            { src: 'fullcalendar/dist/locale-all.js', inject: true },
        ];

        // Add `local` third-party libraries to be injected/bundled.
        this.APP_ASSETS = [
            { src: `${this.APP_SRC}/assets/layout/script/ripple.js`, inject: true, vendor: true },
            { src: `${this.ASSETS_SRC}/fonts/flag-icon-css/css/flag-icon.min.css`, inject: true, vendor: true },
            { src: `${this.ASSETS_SRC}/layout/css/layout-deeppurple.css`, inject: true, vendor: false },
            { src: `${this.ASSETS_SRC}/theme/theme-blue.css`, inject: true, vendor: false },
        ];

        this.APP_LOCALE = 'vn';

        this.ROLLUP_INCLUDE_DIR = [
            ...this.ROLLUP_INCLUDE_DIR,
            //'node_modules/moment/**'
        ];

        this.ROLLUP_NAMED_EXPORTS = [
            ...this.ROLLUP_NAMED_EXPORTS,
            //{'node_modules/immutable/dist/immutable.js': [ 'Map' ]},
        ];

        // install third-party library
        let additionalPackages: any[] = [
            {
                name: 'underscore',
                path: 'node_modules/underscore/underscore-min.js'
            },
            {
                name: 'moment',
                path: 'node_modules/moment/min/moment.min.js'
            },
            {
                name: 'primeng',
                path: 'node_modules/primeng',
                packageMeta: {
                    defaultExtension: 'js'
                }
            },
            {
                name: '@ngx-translate/core',
                path: 'node_modules/@ngx-translate/core',
                packageMeta: {
                    main: 'bundles/core.umd.js',
                    defaultExtension: 'js'
                }
            },
            {
                name: 'file-saver',
                path: 'node_modules/file-saver/FileSaver.js'
            },
            {
                name: 'xlsx',
                path: 'node_modules/xlsx/xlsx.js'
            },
        ];

        this.addPackagesBundles(additionalPackages);

        /* Add proxy middleware */
        // this.PROXY_MIDDLEWARE = [
        //   require('http-proxy-middleware')('/api', { ws: false, target: 'http://localhost:3003' })
        // ];

        /* Add to or override NPM module configurations: */
        // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
    }

}
