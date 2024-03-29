import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      primary: {
        lighter: string;
        light: string;
        main: string;
        dark: string;
      };
      gray: {
        light: string;
        dark: string;
        lighter: string;
      };
      danger: {
        main: string;
        light: string;
        dark: string;
      };
      success: {
        main: string;
      };
    };
  }
}
