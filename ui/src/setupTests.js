import './tempPolyfills'; // remove this when fixed in create-react-app's next buid
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });