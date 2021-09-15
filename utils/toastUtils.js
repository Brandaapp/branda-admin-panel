export function success_post(msg) {
  Materialize.toast(msg, 2500, "green rounded");
}

export function success_patch(msg) {
  Materialize.toast(msg, 2500, "#0d47a1 blue darken-4 rounded");
}

export function error(msg) {
  Materialize.toast(msg, 2500, "red rounded");
}
