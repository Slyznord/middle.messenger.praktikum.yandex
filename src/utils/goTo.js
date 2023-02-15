import Render from "./render";
import Routes from "../routes";

export default (name) => {
	Render(Routes[name]);
}
