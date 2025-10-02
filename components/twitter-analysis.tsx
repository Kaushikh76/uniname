interface TwitterAnalysisProps {
  analysis: any
  topTweets: any[]
}

export function TwitterAnalysis({ analysis, topTweets }: TwitterAnalysisProps) {
  if (!analysis) return null

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold border-b-4 border-foreground pb-2">x analysis</h2>

      <div className="border-4 border-foreground p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b-2 border-foreground pb-2">metrics</h3>

            <div className="space-y-4 text-sm">
              <div className="space-y-2">
                <div className="text-muted-foreground">tweets per hour</div>
                <div className="text-3xl font-bold dithered">
                  {analysis.estimatedTweetsPerHour?.toLocaleString() || 0}
                </div>
              </div>

              {analysis.estimatedEngagement && (
                <>
                  <div className="space-y-2 border-t-2 border-foreground pt-4">
                    <div className="text-muted-foreground">total engagement/hr</div>
                    <div className="text-2xl font-bold">
                      {analysis.estimatedEngagement.totalPerHour?.toLocaleString() || 0}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">likes/hr</div>
                    <div className="text-xl font-bold">
                      {analysis.estimatedEngagement.likesPerHour?.toLocaleString() || 0}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">retweets/hr</div>
                    <div className="text-xl font-bold">
                      {analysis.estimatedEngagement.retweetsPerHour?.toLocaleString() || 0}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-muted-foreground">replies/hr</div>
                    <div className="text-xl font-bold">
                      {analysis.estimatedEngagement.repliesPerHour?.toLocaleString() || 0}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="col-span-2 space-y-4">
            <h3 className="text-lg font-bold border-b-2 border-foreground pb-2">top tweets</h3>
            {topTweets && topTweets.length > 0 ? (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {topTweets.map((tweet, index) => (
                  <div key={tweet.id || index} className="border-2 border-foreground p-4 space-y-3 bg-background">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="font-bold text-sm">{tweet.authorName}</div>
                        <div className="text-xs text-muted-foreground">@{tweet.author}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(tweet.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{tweet.text}</p>
                    <div className="flex gap-6 text-xs border-t-2 border-foreground pt-2">
                      <div className="space-y-1">
                        <div className="text-muted-foreground">likes</div>
                        <div className="font-bold">{tweet.engagement?.likes?.toLocaleString() || 0}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-muted-foreground">retweets</div>
                        <div className="font-bold">{tweet.engagement?.retweets?.toLocaleString() || 0}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-muted-foreground">replies</div>
                        <div className="font-bold">{tweet.engagement?.replies?.toLocaleString() || 0}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-muted-foreground">views</div>
                        <div className="font-bold">{tweet.engagement?.views?.toLocaleString() || 0}</div>
                      </div>
                    </div>
                    {tweet.url && (
                      <a
                        href={tweet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs underline hover:no-underline"
                      >
                        view on x →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">no tweets available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
