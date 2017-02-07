import FrontPageLayout from './comp/FrontPageLayout.js';
import DummyMessageLayout from './comp/DummyMessageLayout.js';



export default {


	generic: {



		layouts: {


		}
	}, 
	
	frontpages: {

		fallback: FrontPageLayout,

		layouts: {

		}
	},

	article: {

		fallback: DummyMessageLayout,
		
		layouts: {


		}

	}



}