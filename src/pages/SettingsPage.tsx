import React, { Dispatch } from "react";
import { Switch, Text, View } from "react-native";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AllActionTypes } from "../store/actions";
import { rootState } from "../store/reducers";
import { myStyles } from "../utils/myStyles";

interface IProps {}

interface IState {}

type Props = IProps & LinkStateProps & LinkDispatchProps;

class SettingsPage extends React.Component<IState, Props> {
  state = {};

  render() {
    return (
      <View style={myStyles.container}>
        <Text>Settings page</Text>
        <Text>collections sort</Text>
        <Text>items sort</Text>
        <Switch />
        <Text>default collection???</Text>
      </View>
    );
  }
}

interface LinkStateProps {}

interface LinkDispatchProps {}

const mapStateToProps = (
  state: rootState,
  ownProps: IProps
): LinkStateProps => ({});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AllActionTypes>,
  ownProps: IProps
): LinkDispatchProps => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
