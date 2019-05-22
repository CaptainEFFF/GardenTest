(function evaluate(require, module, exports, process, setImmediate, global, __dirname, __filename) {"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var cocoSsd = _interopRequireWildcard(require("@tensorflow-models/coco-ssd"));

require("@tensorflow/tfjs");

require("./styles.css");

var App =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(App, _React$Component);

  function App() {
    var _loopIt = 0,
        _getPrototypeOf2,
        _loopIt2 = 0;

    var _this;

    (0, _classCallCheck2.default)(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      if (_loopIt2++ > 10001) {
        global.infiniteLoopError = new RangeError('Potential infinite loop: exceeded ' + 10001 + ' iterations. You can disable this check by creating a sandbox.config.json file.');
        throw global.infiniteLoopError;
      }

      if (_loopIt++ > 10001) {
        global.infiniteLoopError = new RangeError('Potential infinite loop: exceeded ' + 10001 + ' iterations. You can disable this check by creating a sandbox.config.json file.');
        throw global.infiniteLoopError;
      }

      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(App)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.videoRef = _react.default.createRef();
    _this.canvasRef = _react.default.createRef();

    _this.detectFrame = function (video, model) {
      model.detect(video).then(function (predictions) {
        _this.renderPredictions(predictions);

        requestAnimationFrame(function () {
          _this.detectFrame(video, model);
        });
      });
    };

    _this.renderPredictions = function (predictions) {
      var ctx = _this.canvasRef.current.getContext("2d");

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Font options.

      var font = "16px sans-serif";
      ctx.font = font;
      ctx.textBaseline = "top";
      predictions.forEach(function (prediction) {
        var x = prediction.bbox[0];
        var y = prediction.bbox[1];
        var width = prediction.bbox[2];
        var height = prediction.bbox[3]; // Draw the bounding box.

        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height); // Draw the label background.

        ctx.fillStyle = "#00FFFF";
        var textWidth = ctx.measureText(prediction.class).width;
        var textHeight = parseInt(font, 10); // base 10

        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
      });
      predictions.forEach(function (prediction) {
        var x = prediction.bbox[0];
        var y = prediction.bbox[1]; // Draw the text last to ensure it's on top.

        ctx.fillStyle = "#000000";
        ctx.fillText(prediction.class, x, y);
      });
    };

    return _this;
  }

  (0, _createClass2.default)(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        var webCamPromise = navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        }).then(function (stream) {
          window.stream = stream;
          _this2.videoRef.current.srcObject = stream;
          return new Promise(function (resolve, reject) {
            _this2.videoRef.current.onloadedmetadata = function () {
              resolve();
            };
          });
        });
        var modelPromise = cocoSsd.load();
        Promise.all([modelPromise, webCamPromise]).then(function (values) {
          _this2.detectFrame(_this2.videoRef.current, values[0]);
        }).catch(function (error) {
          console.error(error);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("video", {
        className: "size",
        autoPlay: true,
        playsInline: true,
        muted: true,
        ref: this.videoRef,
        width: "600",
        height: "500"
      }), _react.default.createElement("canvas", {
        className: "size",
        ref: this.canvasRef,
        width: "600",
        height: "500"
      }));
    }
  }]);
  return App;
}(_react.default.Component);

var rootElement = document.getElementById("root");

_reactDom.default.render(_react.default.createElement(App, null), rootElement);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQXBwIiwidmlkZW9SZWYiLCJSZWFjdCIsImNyZWF0ZVJlZiIsImNhbnZhc1JlZiIsImRldGVjdEZyYW1lIiwidmlkZW8iLCJtb2RlbCIsImRldGVjdCIsInRoZW4iLCJwcmVkaWN0aW9ucyIsInJlbmRlclByZWRpY3Rpb25zIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY3R4IiwiY3VycmVudCIsImdldENvbnRleHQiLCJjbGVhclJlY3QiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsImZvbnQiLCJ0ZXh0QmFzZWxpbmUiLCJmb3JFYWNoIiwicHJlZGljdGlvbiIsIngiLCJiYm94IiwieSIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwic3Ryb2tlUmVjdCIsImZpbGxTdHlsZSIsInRleHRXaWR0aCIsIm1lYXN1cmVUZXh0IiwiY2xhc3MiLCJ0ZXh0SGVpZ2h0IiwicGFyc2VJbnQiLCJmaWxsUmVjdCIsImZpbGxUZXh0IiwibmF2aWdhdG9yIiwibWVkaWFEZXZpY2VzIiwiZ2V0VXNlck1lZGlhIiwid2ViQ2FtUHJvbWlzZSIsImF1ZGlvIiwiZmFjaW5nTW9kZSIsInN0cmVhbSIsIndpbmRvdyIsInNyY09iamVjdCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwib25sb2FkZWRtZXRhZGF0YSIsIm1vZGVsUHJvbWlzZSIsImNvY29Tc2QiLCJsb2FkIiwiYWxsIiwidmFsdWVzIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJDb21wb25lbnQiLCJyb290RWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJSZWFjdERPTSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztJQUVNQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQUNKQyxRLEdBQVdDLGVBQU1DLFNBQU4sRTtVQUNYQyxTLEdBQVlG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QUt4RCxRQUxaO0FBTUUsUUFBQSxLQUFLLEVBQUMsS0FOUjtBQU9FLFFBQUEsTUFBTSxFQUFDO0FBUFQsUUFERixFQVVFO0FBQ0UsUUFBQSxTQUFTLEVBQUMsTUFEWjtBQUVFLFFBQUEsR0FBRyxFQUFFLEtBQUtHLFNBRlo7QUFHRSxRQUFBLEtBQUssRUFBQyxLQUhSO0FBSUUsUUFBQSxNQUFNLEVBQUM7QUFKVCxRQVZGLENBREY7QUFtQkQ7OztFQTlGZUYsZUFBTXlELFM7O0FBaUd4QixJQUFNQyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixNQUF4QixDQUFwQjs7QUFDQUMsa0JBQVNDLE1BQVQsQ0FBZ0IsNkJBQUMsR0FBRCxPQUFoQixFQUF5QkosV0FBekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xuXG5pbXBvcnQgKiBhcyBjb2NvU3NkIGZyb20gXCJAdGVuc29yZmxvdy1tb2RlbHMvY29jby1zc2RcIjtcbmltcG9ydCBcIkB0ZW5zb3JmbG93L3RmanNcIjtcbmltcG9ydCBcIi4vc3R5bGVzLmNzc1wiO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICB2aWRlb1JlZiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuICBjYW52YXNSZWYgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgICAgY29uc3Qgd2ViQ2FtUHJvbWlzZSA9IG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgLmdldFVzZXJNZWRpYSh7XG4gICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICAgIHZpZGVvOiB7XG4gICAgICAgICAgICBmYWNpbmdNb2RlOiBcInVzZXJcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oc3RyZWFtID0+IHtcbiAgICAgICAgICB3aW5kb3cuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICAgIHRoaXMudmlkZW9SZWYuY3VycmVudC5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9SZWYuY3VycmVudC5vbmxvYWRlZG1ldGFkYXRhID0gKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIGNvbnN0IG1vZGVsUHJvbWlzZSA9IGNvY29Tc2QubG9hZCgpO1xuICAgICAgUHJvbWlzZS5hbGwoW21vZGVsUHJvbWlzZSwgd2ViQ2FtUHJvbWlzZV0pXG4gICAgICAgIC50aGVuKHZhbHVlcyA9PiB7XG4gICAgICAgICAgdGhpcy5kZXRlY3RGcmFtZSh0aGlzLnZpZGVvUmVmLmN1cnJlbnQsIHZhbHVlc1swXSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdEZyYW1lID0gKHZpZGVvLCBtb2RlbCkgPT4ge1xuICAgIG1vZGVsLmRldGVjdCh2aWRlbykudGhlbihwcmVkaWN0aW9ucyA9PiB7XG4gICAgICB0aGlzLnJlbmRlclByZWRpY3Rpb25zKHByZWRpY3Rpb25zKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuZGV0ZWN0RnJhbWUodmlkZW8sIG1vZGVsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclByZWRpY3Rpb25zID0gcHJlZGljdGlvbnMgPT4ge1xuICAgIGNvbnN0IGN0eCA9IHRoaXMuY2FudmFzUmVmLmN1cnJlbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xuICAgIC8vIEZvbnQgb3B0aW9ucy5cbiAgICBjb25zdCBmb250ID0gXCIxNnB4IHNhbnMtc2VyaWZcIjtcbiAgICBjdHguZm9udCA9IGZvbnQ7XG4gICAgY3R4LnRleHRCYXNlbGluZSA9IFwidG9wXCI7XG4gICAgcHJlZGljdGlvbnMuZm9yRWFjaChwcmVkaWN0aW9uID0+IHtcbiAgICAgIGNvbnN0IHggPSBwcmVkaWN0aW9uLmJib3hbMF07XG4gICAgICBjb25zdCB5ID0gcHJlZGljdGlvbi5iYm94WzFdO1xuICAgICAgY29uc3Qgd2lkdGggPSBwcmVkaWN0aW9uLmJib3hbMl07XG4gICAgICBjb25zdCBoZWlnaHQgPSBwcmVkaWN0aW9uLmJib3hbM107XG4gICAgICAvLyBEcmF3IHRoZSBib3VuZGluZyBib3guXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMEZGRkZcIjtcbiAgICAgIGN0eC5saW5lV2lkdGggPSA0O1xuICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAvLyBEcmF3IHRoZSBsYWJlbCBiYWNrZ3JvdW5kLlxuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwRkZGRlwiO1xuICAgICAgY29uc3QgdGV4dFdpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KHByZWRpY3Rpb24uY2xhc3MpLndpZHRoO1xuICAgICAgY29uc3QgdGV4dEhlaWdodCA9IHBhcnNlSW50KGZvbnQsIDEwKTsgLy8gYmFzZSAxMFxuICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHRleHRXaWR0aCArIDQsIHRleHRIZWlnaHQgKyA0KTtcbiAgICB9KTtcblxuICAgIHByZWRpY3Rpb25zLmZvckVhY2gocHJlZGljdGlvbiA9PiB7XG4gICAgICBjb25zdCB4ID0gcHJlZGljdGlvbi5iYm94WzBdO1xuICAgICAgY29uc3QgeSA9IHByZWRpY3Rpb24uYmJveFsxXTtcbiAgICAgIC8vIERyYXcgdGhlIHRleHQgbGFzdCB0byBlbnN1cmUgaXQncyBvbiB0b3AuXG4gICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgICBjdHguZmlsbFRleHQocHJlZGljdGlvbi5jbGFzcywgeCwgeSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8dmlkZW9cbiAgICAgICAgICBjbGFzc05hbWU9XCJzaXplXCJcbiAgICAgICAgICBhdXRvUGxheVxuICAgICAgICAgIHBsYXlzSW5saW5lXG4gICAgICAgICAgbXV0ZWRcbiAgICAgICAgICByZWY9e3RoaXMudmlkZW9SZWZ9XG4gICAgICAgICAgd2lkdGg9XCI2MDBcIlxuICAgICAgICAgIGhlaWdodD1cIjUwMFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxjYW52YXNcbiAgICAgICAgICBjbGFzc05hbWU9XCJzaXplXCJcbiAgICAgICAgICByZWY9e3RoaXMuY2FudmFzUmVmfVxuICAgICAgICAgIHdpZHRoPVwiNjAwXCJcbiAgICAgICAgICBoZWlnaHQ9XCI1MDBcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCByb290RWxlbWVudCk7XG4iXX0=
})