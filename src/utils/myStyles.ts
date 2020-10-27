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
export const stackBackgroundColor = secondColor;

export const myStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    padding: 15,



    // marginBottom: 20,
    // width: 300,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerNonCenter: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
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
  collectionTitleCard: {
    fontSize: 18,
    lineHeight: 22,
    color: fifthColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemTitleCard: {
    fontSize: 14,
    lineHeight: 16,
    color: fifthColor,
    // fontWeight: "bold",
    textAlign: "center",
  },
  receipeNotes: {
    fontSize: 14,
    lineHeight: 18,
    color: "#f4511e",
    textAlign: "center",
  },
  recipeCard: {
    flex: 1,
    width: windowWidth * 0.8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 25,
    marginBottom: 10,
    shadowOpacity: 0.4,
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
    margin: 5,
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
  imageRecipe: {
    width: windowWidth,
    height: windowHeight / 3,
    resizeMode: "cover",
  },
  recipeShoppingList: {
    width: "85%",
  },
  recipePadding: {
    lineHeight: 20,
  },
  recipeIngredientsText: {
    fontSize: 24,
    lineHeight: 24,
    margin: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  recipeCatText: {
    fontSize: 20,
    lineHeight: 24,
    margin: 5,
    marginTop: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  recipeItemGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    borderColor: "grey",
    borderWidth: 0.4,
    borderRadius: 6,
    height: 30,
  },
  recipeItemQuan: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: "left",
    marginRight: 5,
    marginLeft: 4,
    fontWeight: "400",
    color: "grey",
  },
  recipeItem: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: "left",
    fontWeight: "500",
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
  },
  btnBarButtons: {
    backgroundColor: mainColor,
    paddingTop: 8,
    paddingBottom: 8,
    // paddingLeft: 20,
    // paddingRight: 20,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 100,
    // height: 40,
  },
  btnBarButtonText: {
    color: "white",
  },
  input: {
    padding: 15,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
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
    width: 300,
    height: 300,
    resizeMode: "contain",
    // backgroundColor: "black",
    borderRadius: 10,
  },
  imgPlaceHolder: {
    width: 300,
    height: 300,
    borderColor: mainColor,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
});
