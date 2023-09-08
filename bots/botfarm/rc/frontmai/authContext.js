(function() {
  let getAuthUser = function(botContext) {
    let Auth = botContext.getCapability('Auth');
    return Auth.getUser();
  };

  return {
    getAuthUser: getAuthUser,
    version: '1.0.0',
  };
})();
