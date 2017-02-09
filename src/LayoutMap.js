import FrontPageLayout from './comp/FrontPageLayout.js';
import DummyMessageLayout from './comp/DummyMessageLayout.js';
import ArticleParagraphLayout from './comp/ArticleParagraphLayout.js';
import ArticleImageLayout from './comp/ArticleImageLayout.js';
import ArticleVideoLayout from './comp/ArticleVideoLayout.js';



export default {


	generic: {

		fallback: DummyMessageLayout,

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
			"paragraph": ArticleParagraphLayout,
			"image": ArticleImageLayout,
			"video": ArticleVideoLayout
		}

	}



}