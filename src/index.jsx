import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "./i18n";
import reportWebVitals from "./reportWebVitals";
import { wagmiConfig } from './walletConfiguration/Config';
import { WagmiConfig} from 'wagmi'
import { MyProvider } from "./Context/MyProvider";

const Root = () => {
  return (
    <div className="App">
       <WagmiConfig config={wagmiConfig}>
        <MyProvider>
        <App />
        </MyProvider>
       </WagmiConfig>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

// ReactDOM.createRoot(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
