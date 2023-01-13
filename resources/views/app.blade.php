<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link href="{{ mix('/resources/css/app.css') }}" rel="stylesheet" />
    <script type="module" src="{{ mix('/resources/js/app.tsx') }}" defer></script>
    @inertiaHead
  </head>
  <body>
    <div id="app" data-page="{{ json_encode($page) }}" class="bg-red"></div>
  </body>
</html>