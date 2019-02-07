export const transformProfileData = profile => {
  const {posts = [], reviews} = profile

  let postIndex = 1 // ignore first image

  const newReviewsArray = reviews
    .map(review => {
      const {images: reviewImages = []} = review
      const reviewHasImage = reviewImages.length > 0
      let imageUrl = null

      if (reviewHasImage) {
        imageUrl = reviewImages[0].url
      }

      if (postIndex < posts.length) {
        imageUrl = posts[postIndex].images[0].url
        postIndex++
      }

      return {...review, imageUrl}
    })
    .filter(({imageUrl}) => !!imageUrl)

  const newPostsArray = posts.slice(postIndex, posts.length)

  return {
    ...profile,
    posts: newPostsArray,
    reviews: newReviewsArray
  }
}
