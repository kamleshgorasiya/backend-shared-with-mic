import { AdminUiExtension,compileUiExtensions } from '@vendure/ui-devkit/compiler';
import path from 'path';

export class ShareUIPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared',
                ngModuleFileName: 'share.module.ts',
                ngModuleName: 'SharedExtensionModule',
            },
        ],
    };
}


export function customAdminUi(options: { recompile: boolean; devMode: boolean }) {
    const compiledAppPath = path.join(__dirname, '../../admin-ui');
    if (options.recompile) {
        return compileUiExtensions({
            outputPath: compiledAppPath,
            extensions: [ShareUIPlugin.uiExtensions],
            devMode: true,
        });
    } else {
        return {
            path: path.join(compiledAppPath, 'dist'),
        };
    }
}