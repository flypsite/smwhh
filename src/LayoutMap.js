import FrontPageLayout from './comp/FrontPageLayout.js';
import DummyMessageLayout from './comp/DummyMessageLayout.js';
import ArticleParagraphLayout from './comp/ArticleParagraphLayout.js';
import ArticleImageLayout from './comp/ArticleImageLayout.js';
import ArticleVideoLayout from './comp/ArticleVideoLayout.js';
import ArticleQuoteLayout from './comp/ArticleQuoteLayout.js';
import SocialMessageLayout from './comp/SocialMessageLayout.js';
import FullPageVideoLayout from './comp/FullPageVideoLayout.js';



export default {


	generic: {

		fallback: DummyMessageLayout,

		layouts: {


		}
	}, 
	
	fullpage: {

		fallback: FrontPageLayout,

		layouts: {
			"video":     FullPageVideoLayout
		}
	},

	tiles: {

		fallback: FrontPageLayout,

		layouts: {
			"video":     FullPageVideoLayout
		}
	},

	article: {

		fallback: ArticleParagraphLayout,

		layouts: {
			"paragraph": ArticleParagraphLayout,
			"image":     ArticleImageLayout,
			"quote":     ArticleQuoteLayout,
			"video":     ArticleVideoLayout,
			"message":   SocialMessageLayout,
			"postcardtext":   SocialMessageLayout
			
		}
	}


}