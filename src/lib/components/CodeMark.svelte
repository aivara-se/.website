<!-- The code: the Octocat silhouette cut out of the same square the log's mark draws. The
     silhouette is carried as a one-bit mask — the square is the ink, the cat is the hole — so
     the link's colour fills it and nothing else is drawn. -->
<span class="mark" aria-hidden="true"></span>

<style>
  .mark {
    display: block;
    width: 16px;
    height: 16px;
    background-color: currentColor;
    -webkit-mask: url("/github-mark.png") center / 16px 16px no-repeat;
    mask: url("/github-mark.png") center / 16px 16px no-repeat;
  }
</style>
