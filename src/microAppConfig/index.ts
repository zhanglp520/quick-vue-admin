import microApp from '@micro-zoe/micro-app'

export const start=()=>{
    microApp.start({
        plugins:{
            modules:{
                'app-demo': [
                    {
                      loader(code) {
                        // @ts-ignore
                        if (process.env.NODE_ENV === 'development') {
                          // 这里 /basename/ 需要和子应用vite.config.js中base的配置保持一致
                          code = code.replace(/(from|import)(\s*['"])(\/app-demo\/)/g, all => {
                            return all.replace('/app-demo/', `${import.meta.env.VITE_APP_DEMO_URL}/app-demo/`)
                          })
                        }
            
                        return code
                      }
                    }
                  ],
                  'app-tools': [
                    {
                      loader(code) {
                        // @ts-ignore
                        if (process.env.NODE_ENV === 'development') {
                          code = code.replace(/(from|import)(\s*['"])(\/app-tools\/)/g, all => {
                            return all.replace('/app-tools/', `${import.meta.env.VITE_APP_DEMO_URL}/app-tools/`)
                          })
                        }
            
                        return code
                      }
                    }
                  ],
            }
        }
      })
}