"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingApplicationDataPartial = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
function LoadingApplicationDataPartial(_a, loadees) {
    var { children } = _a, props = __rest(_a, ["children"]);
    console.log(loadees.length);
    return (0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: children });
    /*
  if (loadees.every((x) => x)) return <>{children}</>
  else
    return (
      <>
        <div className="center">
          <Stack spacing={2} direction="row">
            <LinearProgress variant="indeterminate" style={{ width: "100%" }} />
          </Stack>
          <Typography>Loading...</Typography>
        </div>
      </>
    )*/
}
exports.LoadingApplicationDataPartial = LoadingApplicationDataPartial;
