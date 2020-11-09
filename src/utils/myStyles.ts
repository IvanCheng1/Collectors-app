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
    fontSize: 14,
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    padding: 15,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputAndroid: {
    fontSize: 14,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    padding: 15,
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
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
    justifyContent: "center",
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imageList: {
    width: windowHalfWidth,
    height: windowHalfWidth,
  },
  imageListThirds: {
    width: windowThirdWidth,
    height: windowThirdWidth,
  },
  box: {
    borderColor: "grey",
    borderWidth: 1,
  },
  itemCardContainer: {
    width: windowThirdWidth,
  },
  collectionTitleHolder: {
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
    textAlign: "center",
  },
  itemDateCard: {
    fontSize: 11,
    lineHeight: 13,
    color: thirdColor,
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
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 140,
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
    opacity: 0.9,
  },
  bottomCounterText: {
    color: fifthColor,
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
    resizeMode: "contain",
  },
  imgLandscape: {
    width: windowWidth * 0.95,
    height: (windowWidth * 3) / 4,
    resizeMode: "contain",
  },
  imgPortrait: {
    width: windowWidth,
    height: windowWidth,
    resizeMode: "contain",
  },
  imgEdit: {
    resizeMode: "contain",
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
