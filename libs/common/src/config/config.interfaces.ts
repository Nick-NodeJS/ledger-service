declare type ConfigFactoryReturnValue =
  | Record<string, any>
  | Promise<Record<string, any>>;
export declare type ConfigFactory<
  T extends ConfigFactoryReturnValue = ConfigFactoryReturnValue,
> = () => T;

export interface ConfigModuleOptions {
  cache?: boolean;
  isGlobal?: boolean;
  ignoreEnvFile?: boolean;
  ignoreEnvVars?: boolean;
  envFilePath?: string | string[];
  encoding?: string;
  validate?: (config: Record<string, any>) => Record<string, any>;
  validationSchema?: any;
  validationOptions?: Record<string, any>;
  load?: Array<ConfigFactory>;
  expandVariables?: any;
}
