let href,
  sT = setTimeout,
  sI = setInterval,
  completed = !1,
  pending = !1,
  blurWorks = !1,
  getSteps = function () {
    var t = localStorage.getItem("csteps");
    return t ? JSON.parse(t) : [];
  },
  addStep = function (t) {
    var e = getSteps();
    -1 == e.indexOf(t) && e.push(t),
      localStorage.setItem("csteps", JSON.stringify(e)),
      evaluateSteps();
  },
  evaluateSteps = function () {
    var t = getSteps(),
      e = !0;
    $(".step-clicked").each(function () {
      var a = $(this).data("targetid");
      if (-1 != t.indexOf(a)) {
        if (!$(this).hasClass("step_done")) {
          $(this).addClass("step_done");
          var i = $(this).data("id");
          $("#checkmark" + i).show();
        }
      } else (e = !1), $(this).hasClass("step_done") && $(this).removeClass("step_done");
    }),
      e &&
        ((completed = !0),
        ($("#targetbtn").removeAttr("disabled")));
  };
sI(function () {
  completed ? clearInterval(sI) : $("#targetbtn").attr("disabled", "disabled");
}, 100),
  $(".step-clicked").each(function () {
    this.onclick = function (t) {
      (href = $(this).data("targetid")), ($this = $(this));
      var e = atob($(".action-url").data("link")),
        a = $(this).data("id");
      !pending &&
        t.isTrusted &&
        ((pending = !0),
        $.ajax({

        }),
        blurWorks ||
          sT(function () {
            blurWorks || ((pending = !1), href && addStep(href));
          }, 6e3));
    };
  }),
  $(window)
    .on("focus", function () {
      pending && blurWorks && ((pending = !1), href && addStep(href));
    })
    .on("blur", function () {
      blurWorks = !0;
    }),
  evaluateSteps();
