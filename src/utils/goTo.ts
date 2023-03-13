import Render from "./render";
import Routes from "../routes";

export default (name:string):void => {
	Render(Routes[name]);
}
