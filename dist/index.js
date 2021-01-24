"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var favicons_1 = __importDefault(require("favicons"));
var loader_utils_1 = require("loader-utils");
var utils_1 = require("./utils");
var trailingSlash = function (path) {
    return path.substr(-1) !== '/' ? path + "/" : path;
};
var HTML_REGEX = new RegExp(/<([^ ]*)\s(.*)>/);
function loader(content) {
    return __awaiter(this, void 0, void 0, function () {
        var callback;
        var _this = this;
        return __generator(this, function (_a) {
            callback = this.async();
            void (function () { return __awaiter(_this, void 0, void 0, function () {
                var config, prefix, outputPath, isFull, tags, url, _a, html, images, files, assets, jsx, result;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            config = __assign({ outputPath: 'static/favicons', path: '/_next/static/favicons', emitFiles: true, alwaysEmitFull: false, appName: null, appShortName: null, appDescription: null, developerName: null, developerURL: null, dir: 'auto', lang: 'en-US', background: '#fff', theme_color: '#fff', appleStatusBarStyle: 'black-translucent', display: 'standalone', orientation: 'any', scope: '/', start_url: '/', version: '1.0', logging: false, pixel_art: false, loadManifestWithCredentials: false, icons: {
                                    android: true,
                                    appleIcon: true,
                                    appleStartup: false,
                                    coast: false,
                                    favicons: true,
                                    firefox: false,
                                    windows: false,
                                    yandex: false // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                                } }, loader_utils_1.getOptions(this));
                            prefix = config.prefix &&
                                trailingSlash(loader_utils_1.interpolateName(this, config.prefix, {
                                    context: this.rootContext,
                                    content: JSON.stringify([content, config.options])
                                }));
                            outputPath = config.outputPath
                                ? trailingSlash(config.outputPath)
                                : prefix;
                            isFull = process.env.NODE_ENV === 'production' || config.alwaysEmitFull;
                            if (!!isFull) return [3 /*break*/, 1];
                            url = loader_utils_1.interpolateName(this, '[name].[hash].[ext]', {
                                context: this.rootContext,
                                content: content
                            });
                            this.emitFile(outputPath + url, content, null, {
                                isImmutable: true,
                                sourceFilename: utils_1.normalizePath(path_1.relative(this.rootContext, this.resourcePath))
                            });
                            tags = ["<link rel=\"icon\" href=\"" + config.path + "/" + url + "\">"];
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, favicons_1.default(content, config)];
                        case 2:
                            _a = _b.sent(), html = _a.html, images = _a.images, files = _a.files;
                            tags = html;
                            assets = images.map(function (_a) {
                                var name = _a.name, contents = _a.contents;
                                return ({
                                    name: outputPath + name,
                                    contents: contents
                                });
                            });
                            if (typeof config.emitFiles === 'undefined' || config.emitFiles) {
                                assets.forEach(function (_a) {
                                    var name = _a.name, contents = _a.contents;
                                    var assetInfo = {};
                                    var normalizedName = name;
                                    var idx = normalizedName.indexOf('?');
                                    if (idx >= 0) {
                                        normalizedName = normalizedName.substr(0, idx);
                                    }
                                    var isImmutable = /\[([^:\]]+:)?(hash|contenthash)(:[^\]]+)?]/gi.test(normalizedName);
                                    if (isImmutable === true) {
                                        assetInfo.immutable = true;
                                    }
                                    assetInfo.sourceFilename = utils_1.normalizePath(path_1.relative(_this.rootContext, _this.resourcePath));
                                    _this.emitFile(name, contents, null, assetInfo);
                                });
                                files.forEach(function (_a) {
                                    var name = _a.name, contents = _a.contents;
                                    _this.emitFile(outputPath + name, contents, null);
                                });
                            }
                            _b.label = 3;
                        case 3:
                            jsx = tags.map(function (tag, i) {
                                var _a = __read(HTML_REGEX.exec(tag), 3), _ = _a[0], tagName = _a[1], rest = _a[2];
                                var items = rest
                                    .split('" ')
                                    .map(function (x) { return x.split('='); })
                                    .map(function (_a) {
                                    var _b = __read(_a, 2), key = _b[0], value = _b[1];
                                    return [key, value.replace(/^"/, '').replace(/"$/, '')];
                                })
                                    .concat([['key', "" + i]]);
                                var attributes = Object.fromEntries(items);
                                return "React.createElement(\"" + tagName + "\", " + JSON.stringify(attributes) + ")";
                            });
                            result = "const React = require('react')\n    module.exports = ([" + jsx.join(',\r\n') + "])\n      ";
                            callback(null, result);
                            return [2 /*return*/];
                    }
                });
            }); })();
            return [2 /*return*/];
        });
    });
}
exports.default = loader;
module.exports.raw = true;
