import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import Counter from "./counter";

class Countdown extends Component {
  onPress = () => {
    const { actions } = this.props;
    if (actions.clickAction) {
      actions.clickAction();
    }
  };

  onFinish = () => {
    const { actions } = this.props;
    if (actions.finishAction) {
      actions.finishAction();
    }
  };

  render() {
    const {
      editor,
      _height,
      until,
      format,
      timer: { size, backgroundColor, borderColor, borderWidth, fontColor, fontWeight },
      labels: {
        enabled: enabledLbls,
        fontColor: fontColorLbls,
        fontWeight: fontWeightLbls,
        seconds,
        minutes,
        hours,
        days,
      },
      separator: { enabled: enabledSpr, separatorColor },
    } = this.props;

    return (
      <View style={[styles.wrapper, { height: _height }]}>
        <Counter
          running={!editor}
          key={`countdown.${until}`}
          size={size}
          until={until}
          digitStyle={{
            backgroundColor: backgroundColor,
            borderWidth: borderWidth,
            borderColor: borderColor,
          }}
          digitTxtStyle={{ color: fontColor, fontWeight: fontWeight }}
          timeToShow={this.getFormat(format)}
          timeLabels={this.getLabels(enabledLbls, format, seconds, minutes, hours, days)}
          timeLabelStyle={{ color: fontColorLbls, fontWeight: fontWeightLbls }}
          separatorStyle={{ color: separatorColor }}
          showSeparator={enabledSpr}
          onPress={this.onPress}
          onFinish={this.onFinish}
        />
      </View>
    );
  }

  getFormat(option) {
    switch (option) {
      case 0:
        return ["S"];
      case 1:
        return ["M", "S"];
      case 2:
        return ["H", "M", "S"];
      case 3:
        return ["D", "H", "M", "S"];
      default:
        return ["M", "S"];
    }
  }

  getLabels(enabled, option, seconds, minutes, hours, days) {
    if (!enabled) return { d: null, h: null, m: null, s: null };
    switch (option) {
      case 0:
        return { d: null, h: null, m: null, s: seconds };
      case 1:
        return { d: null, h: null, m: minutes, s: seconds };
      case 2:
        return { d: null, h: hours, m: minutes, s: seconds };
      case 3:
        return { d: days, h: hours, m: minutes, s: seconds };
      default:
        return { d: null, h: null, m: minutes, s: seconds };
    }
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Countdown;
