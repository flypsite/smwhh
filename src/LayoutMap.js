import FrontPageLayout from './comp/FrontPageLayout.js';
import DummyMessageLayout from './comp/DummyMessageLayout.js';
import ArticleParagraphLayout from './comp/ArticleParagraphLayout.js';
import ArticleImageLayout from './comp/ArticleImageLayout.js';
import ArticleVideoLayout from './comp/ArticleVideoLayout.js';
import SocialMessageLayout from './comp/SocialMessageLayout.js';



export default {


	generic: {

		fallback: DummyMessageLayout,

		layouts: {


		}
	}, 
	
	fullpage: {

		fallback: FrontPageLayout,

		layouts: {
		}
	},

	article: {

		fallback: ArticleParagraphLayout,

		layouts: {
			"paragraph": ArticleParagraphLayout,
			"image":     ArticleImageLayout,
			"video":     ArticleVideoLayout,
			"message":   SocialMessageLayout,
			"postcardtext":   SocialMessageLayout
			
		}
	}


}