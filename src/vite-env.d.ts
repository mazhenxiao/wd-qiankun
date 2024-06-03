/// <reference types="vite/client" />
declare let WFClientSDK: any;
declare let wanda_wf_tool: any;
declare let wanda_wf_client: any;
declare const WFDynamicRole: any;
declare type Maybe<T> = T | undefined | null;

interface ImportMetaEnv {
  // 当前环境
  readonly VITE_ENV: 'development' | 'production';
  readonly VITE_API_URL_PREFIXXXGK: string;
  readonly VITE_API_URL_QX_SERVER: string;
}
