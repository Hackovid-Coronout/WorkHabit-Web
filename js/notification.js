let notification_addedListener = false;

notification_sound = document.createElement("audio");
notification_sound.src = "./sound/clearly.mp3";
notification_sound.setAttribute("preload", "auto");
notification_sound.setAttribute("controls", "none");
notification_sound.style.display = "none";
$('body').append(notification_sound);

function notification(message, className)
{
    if(message)
    {
        if(typeof className == 'undefined') className = 'base';
        if(!notification_addedListener)
        {
            notification_addedListener = true;
            $(document).on("notify-hide", function(e) {
                notification_off();
            });
        }

        $.notify(
            message,
            {
                position:"top center",
                autoHide: false,
                className: className
            }
        );
        notification_sound.play();
        notification_on();
    }
}


let notification_faviconSwitched = false;
let notification_faviconInterval;
function notification_on()
{
    notification_faviconInterval = setInterval(function(){
        if(notification_faviconSwitched)
        {
            notification_setNormalFavicon();
        }
        else
        {
            notification_setAlertFavicon();
        }
    }, 500);
}
function notification_off()
{
    clearInterval(notification_faviconInterval);
    if(notification_faviconSwitched)
    {
        notification_setNormalFavicon();
    }
}


let notification_normalFavicon = {
    'icon16': './img/favicon-16x16.png',
    'icon32': './img/favicon-32x32.png',
    'icon96': './img/favicon-96x96.png'
};
let notification_alertFavicon = {
    'icon16': './img/favicon-alert-16x16.png',
    'icon32': './img/favicon-alert-32x32.png',
    'icon96': './img/favicon-alert-96x96.png'
};
function notification_setAlertFavicon()
{
    notification_faviconSwitched = true;
    $('#icon16').attr('href', notification_alertFavicon.icon16);
    $('#icon32').attr('href', notification_alertFavicon.icon32);
    $('#icon96').attr('href', notification_alertFavicon.icon96);
}
function notification_setNormalFavicon()
{
    notification_faviconSwitched = false;
    $('#icon16').attr('href', notification_normalFavicon.icon16);
    $('#icon32').attr('href', notification_normalFavicon.icon32);
    $('#icon96').attr('href', notification_normalFavicon.icon96);
}