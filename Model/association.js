import User from "./User.model.js";
import Racipe from "./Racipe.model.js";
import Favourite from "./favourite.model.js"
User.hasMany(Racipe,{
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
Racipe.belongsTo(User,{
  foreignKey: 'userId',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Racipe.hasMany(Favourite, { foreignKey: "recipeId" });
Favourite.belongsTo(Racipe, { foreignKey: "recipeId" });
User.hasMany(Favourite, { foreignKey: "userId" });
Favourite.belongsTo(User, { foreignKey: "userId" });


