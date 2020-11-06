import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHalfWidth = windowWidth / 2;
const windowThirdWidth = windowWidth / 3;
const windowHeight = Dimensions.get("window").height;
export const mainColor = "#05878a";
export const secondColor = "#074e67";
export const thirdColor = "#003850";
export const fourthColor = "#002448";
export const fifthColor = "#001440";
export const paleColor = "#66babf";
export const stackBackgroundColor = secondColor;

export const myStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    padding: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerFlatList: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  containerNonCenter: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  imageList: {
    width: windowHalfWidth,
    height: windowHalfWidth,
    // borderRadius: 10,
  },
  imageListThirds: {
    width: windowThirdWidth,
    height: windowThirdWidth,
    // borderRadius: 10,
  },
  box: {
    borderColor: "grey",
    borderWidth: 1,
  },
  itemCardContainer: {
    // paddingTop: 5,
    // paddingBottom: 5,
    width: windowThirdWidth,
    // height: windowHalfWidth + 50,
    // height: 100%,
    // alignItems: "center",
    // justifyContent: "center",
    // borderRadius: 10,
    // marginBottom: 5,
    // borderColor: "grey",
  },
  collectionTitleHolder: {
    // paddingLeft: 20,
    // paddingRight: 20,
    flexDirection: "row",
    justifyContent: "center",
    padding: 3,
    marginBottom: 3,
  },
  collectionTitleCard: {
    fontSize: 18,
    lineHeight: 20,
    color: fifthColor,
    fontWeight: "bold",
    textAlign: "center",
    paddingRight: 5,
  },
  collectionDateCard: {
    color: thirdColor,
    textAlign: "center",
  },
  itemTitleHolder: {
    padding: 1,
    marginBottom: 5,
  },
  itemTitleCard: {
    fontSize: 13,
    lineHeight: 15,
    color: fifthColor,
    // fontWeight: "bold",
    textAlign: "center",
  },
  itemDateCard: {
    fontSize: 11,
    lineHeight: 13,
    color: thirdColor,
    // fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    color: "#f4511e",
    margin: 10,
    fontWeight: "bold",
  },
  itemDate: {
    fontSize: 20,
    lineHeight: 26,
    color: fifthColor,
    margin: 20,
    // marginBottom: 0,

    // fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 20,
    color: "#f88967",
  },
  itemDescription: {
    fontSize: 22,
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: secondColor,
  },
  itemLocation: {
    fontSize: 14,
    lineHeight: 16,
    // marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    color: mainColor,
  },

  btn: {
    backgroundColor: mainColor,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 250,
    height: 50,
  },
  btnDisabled: {
    backgroundColor: "grey",
  },
  btnSmall: {
    backgroundColor: mainColor,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 100,
    // height: 40,
  },
  btnDark: {
    backgroundColor: thirdColor,
  },
  btnText: {
    color: "#FFF",
    fontSize: 15,
  },
  btnBar: {
    flexDirection: "row",
    margin: 10,
  },
  btnBarButtons: {
    backgroundColor: mainColor,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    // paddingLeft: 20,
    // paddingRight: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 70,
    height: 40,
  },
  btnBarButtonText: {
    color: "white",
  },
  btnBarArrows: {
    flexDirection: "row",
    position: "absolute",
    bottom: 15,
  },
  btnBarArrowsButtons: {
    backgroundColor: mainColor,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    // paddingLeft: 20,
    // paddingRight: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 140,
    // height: 40,
  },
  btnBarArrowsButtonText: {
    color: "white",
  },
  searchbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    width: windowWidth * 0.93,
  },
  searchbarTextInput: {
    width: "90%",
    padding: 2,
  },
  searchbarCross: {
    flexDirection: "column",
    justifyContent: "center",
  },
  bottomCounter: {
    flexDirection: "row",
    position: "absolute",
    bottom: 8,
    margin: 3,
    padding: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 10,
    backgroundColor: paleColor,
    // backgroundColor: mainColor,
    opacity: 0.9,
  },
  bottomCounterText: {
    color: fifthColor,
    // color: "white",
    fontSize: 15,
  },
  input: {
    padding: 15,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    width: 300,
  },
  inputRecipeGroup: {
    flexDirection: "row",
  },
  inputQuantityRight: {
    padding: 15,
    borderColor: "#f4511e",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    width: 80,
  },
  inputItemLeft: {
    padding: 15,
    borderColor: "#f4511e",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    width: 250,
  },
  addRecipeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  img: {
    // width: windowWidth * 0.95,
    // height: windowWidth * 0.95,
    // height: 400,
    resizeMode: "contain",
    // backgroundColor: "black",
    // borderRadius: 10,
    // marginTop: windowWidth * 0.05,
  },
  imgLandscape: {
    width: windowWidth * 0.95,
    height: windowWidth * 3 / 4 ,
    // height: 400,
    resizeMode: "contain",
    // backgroundColor: "black",
    // borderRadius: 10,
    // marginTop: windowWidth * 0.05,
  },
  imgPortrait: {
    width: windowWidth,
    height: windowWidth,
    // height: 450,
    resizeMode: "contain",
    // backgroundColor: "black",
    // borderRadius: 10,
    // marginTop: windowWidth * 0.05,
  },
  imgEdit: {
    // width: windowWidth * 0.95,
    // height: windowWidth * 0.95,
    // height: 400,
    resizeMode: "contain",
    // backgroundColor: "black",
    // borderRadius: 10,
    marginTop: windowWidth * 0.05,
  },
  imgPlaceHolder: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowWidth * 0.05,
  },
  shoppingListSectionTitle: {
    fontSize: 20,
    lineHeight: 26,
    color: "#f4511e",
    fontWeight: "bold",
    textAlign: "left",
    margin: 10,
  },
  shoppingListItem: {
    // flexDirection: "row",
    // borderColor: "#f4511e",
    // borderWidth: 1,
    // borderRadius: 10,
    // width: windowWidth * 0.95,
    // flex: 1,
    // padding: 0,
  },
  checkBox: {
    marginRight: 15,
  },
  shoppingItemDescription: {
    flex: 1,
  },
  shoppingItemDescriptionFor: {
    color: "grey",
    fontSize: 13,
    // paddingLeft: 5,
  },
  shoppingItemDescriptionCrossed: {
    textDecorationLine: "line-through",
    color: "grey",
  },
  shoppingListBin: {
    marginLeft: 10,
    marginRight: 10,
  },
  verticalAlign: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
