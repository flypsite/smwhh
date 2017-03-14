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
			"quote":     ArticleQuoteLayout,  // to be discussed, temporary

			"image":          ArticleImageLayout,  // from flypsite
			"image_text":     ArticleImageLayout,
			"video":          ArticleVideoLayout,
			"message":        SocialMessageLayout,
			"postcard":       SocialMessageLayout,
			"postcard_text":  SocialMessageLayout,
			"slideshow":      SocialMessageLayout   // temporary
//todo			"iframe": ???
//todo			"slideshow": ???
//todo			"teaser": ???
//todo			"text_link": ???
//todo			"image_link": ???
//todo			"image_text_link": ???
//todo			"text_big": ???
//todo			"text_small": ???
			
		}
	}


}