<!DOCTYPE html>
<head>
    <meta http-equiv='Content-type' content='text/html; charset=utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Picture Element Demo</title>
    <link href="css/style.min.css" type="text/css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>
<?php
require __DIR__.'/php/get_ip.php';

if (@$details->country === "NO") {
    $l_hjem = "Hjem";
    $l_om = "Om";
    $l_kontakt = "Kontakt";
    $l_kode = "Kode";
} else {
    $l_hjem = "Home";
    $l_om = "About";
    $l_kontakt = "Contact";
    $l_kode = "Code";
}

$json = json_decode(file_get_contents(__DIR__."/../package.json"),true);
?>

<div class="container">
    <div class="header">
        <ul class="nav nav-pills pull-right">
            <li class="active"><a href="index.html"><?php echo $l_hjem; ?></a></li>
            <li><a href="http://www.robbestad.com"><?php echo $l_om; ?></a></li>
            <li><a href="mailto:anders@robbestad.com"><?php echo $l_kontakt; ?></a></li>
        </ul>
        <h3 class="text-muted" id="content">Headline</h3>
    </div>

    <div id="fastsin">

    </div>
<!--    <div id="draw-target"></div>-->
    <div class="jumbotron">

        <?php if (@$details->country === "NO") { ?>
        <p>
            The shattered water made a misty din.<br/>
            Great waves looked over others coming in,<br/>
            And thought of doing something to the shore<br/>
            That water never did to land before.<br/>
            The clouds were low and hairy in the skies,<br/>
            Like locks blown forward in the gleam of eyes.<br/>
            You could not tell, and yet it looked as if<br/>
            The shore was lucky in being backed by cliff,<br/>
            The cliff in being backed by continent;<br/>
            It looked as if a night of dark intent<br/>
            Was coming, and not only a night, an age.<br/>
            Someone had better be prepared for rage.<br/>
            There would be more than ocean-water broken<br/>
            Before God's last <em>Put out the light</em> was spoken.
        </p>
        <?php } else { ?>
          <p>
              The shattered water made a misty din.<br/>
              Great waves looked over others coming in,<br/>
              And thought of doing something to the shore<br/>
              That water never did to land before.<br/>
              The clouds were low and hairy in the skies,<br/>
              Like locks blown forward in the gleam of eyes.<br/>
              You could not tell, and yet it looked as if<br/>
              The shore was lucky in being backed by cliff,<br/>
              The cliff in being backed by continent;<br/>
              It looked as if a night of dark intent<br/>
              Was coming, and not only a night, an age.<br/>
              Someone had better be prepared for rage.<br/>
              There would be more than ocean-water broken<br/>
              Before God's last <em>Put out the light</em> was spoken.
          </p>
        <?php } ?>
    </div>

<!--    <div class="row marketing">-->
<!--        <div class="col-md-6 col-xs-12">-->
<!--            <picture>-->
<!--                <source media="(min-width: 45em)" srcset="img/large.jpg">-->
<!--                <source media="(min-width: 32em)" srcset="img/med.jpg">-->
<!--                <img src="img/small.jpg" alt="Rembrandt" class="img img-responsive">-->
<!--            </picture>-->
<!--        </div>-->
<!--        <div class="col-md-6 col-xs-12">-->
<!---->
<!--        </div>-->
<!--    </div>-->

    <div id="footer">

        Copyright &copy; <?php echo date("Y"); ?> - Sven Anders Robbestad - Source: <a href="<?php echo $json["repository"]["url"]; ?>">github.com</a>
    </div>

</div>
<!-- /div.container -->

</body>
<!-- Contains jQuery, React and compiled js (included jsx) -->
<script type="text/javascript" src="./js/libs.min.js"></script>
<script type="text/javascript" src="./js/app.js"></script>
