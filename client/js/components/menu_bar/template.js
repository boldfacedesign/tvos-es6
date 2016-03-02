export default function template() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <menuBarTemplate>
    <menuBar>
      <menuItem href="#movies" id="movies" loadingtext="Movies">
        <title>Movies</title>
      </menuItem>
      <menuItem href="#tv_shows" id="tv_shows" loadingtext="TV Shows">
        <title>TV Shows</title>
      </menuItem>
      <menuItem href="#search" id="search" loadingtext="Search">
        <title>Search</title>
      </menuItem>
    </menuBar>
  </menuBarTemplate>
</document>`
}