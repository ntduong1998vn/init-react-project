import * as path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src/'),
            '@pages': `${path.resolve(__dirname, './src/pages/')}`,
            '@assets': `${path.resolve(__dirname, './src/assets/')}`,
            '@components': `${path.resolve(__dirname, './src/components/')}`,
        },
    },
    // In cases where hot reload doesn't work
    // server: {
    //   watch: {
    //     usePolling: true,
    //   },
    // },
})
