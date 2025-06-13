"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var serverless_1 = require("@neondatabase/serverless");
var neon_serverless_1 = require("drizzle-orm/neon-serverless");
var ws_1 = require("ws");
var schema = require("./shared/schema");
// Setup database connection
serverless_1.neonConfig.webSocketConstructor = ws_1.default;
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("🚀 Starting database schema push");
                    pool = new serverless_1.Pool({ connectionString: process.env.DATABASE_URL });
                    db = (0, neon_serverless_1.drizzle)(pool, { schema: schema });
                    console.log("🔧 Creating tables if they don't exist...");
                    // This will create all tables based on schema
                    // We're using direct push instead of migrations for simplicity
                    return [4 /*yield*/, db.execute("\n    CREATE TABLE IF NOT EXISTS users (\n      id SERIAL PRIMARY KEY,\n      username TEXT NOT NULL UNIQUE,\n      email TEXT NOT NULL UNIQUE,\n      password TEXT NOT NULL,\n      display_name TEXT NOT NULL,\n      avatar TEXT,\n      bio TEXT,\n      total_points INTEGER NOT NULL DEFAULT 0,\n      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()\n    );\n    \n    CREATE TABLE IF NOT EXISTS action_types (\n      id SERIAL PRIMARY KEY,\n      name TEXT NOT NULL,\n      points INTEGER NOT NULL,\n      icon TEXT NOT NULL,\n      description TEXT,\n      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()\n    );\n    \n    CREATE TABLE IF NOT EXISTS actions (\n      id SERIAL PRIMARY KEY,\n      user_id INTEGER NOT NULL REFERENCES users(id),\n      action_type_id INTEGER NOT NULL REFERENCES action_types(id),\n      description TEXT NOT NULL,\n      points INTEGER NOT NULL,\n      location TEXT,\n      image_url TEXT,\n      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()\n    );\n    \n    CREATE TABLE IF NOT EXISTS badges (\n      id SERIAL PRIMARY KEY,\n      name TEXT NOT NULL,\n      description TEXT NOT NULL,\n      level TEXT NOT NULL,\n      icon TEXT NOT NULL,\n      required_points INTEGER NOT NULL,\n      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()\n    );\n    \n    CREATE TABLE IF NOT EXISTS user_badges (\n      user_id INTEGER NOT NULL REFERENCES users(id),\n      badge_id INTEGER NOT NULL REFERENCES badges(id),\n      acquired_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),\n      PRIMARY KEY (user_id, badge_id)\n    );\n    \n    CREATE TABLE IF NOT EXISTS groups (\n      id SERIAL PRIMARY KEY,\n      name TEXT NOT NULL,\n      description TEXT NOT NULL,\n      icon TEXT NOT NULL,\n      created_by INTEGER NOT NULL REFERENCES users(id),\n      member_count INTEGER NOT NULL DEFAULT 0,\n      total_points INTEGER NOT NULL DEFAULT 0,\n      monthly_target INTEGER NOT NULL DEFAULT 500,\n      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()\n    );\n    \n    CREATE TABLE IF NOT EXISTS group_members (\n      user_id INTEGER NOT NULL REFERENCES users(id),\n      group_id INTEGER NOT NULL REFERENCES groups(id),\n      is_admin BOOLEAN NOT NULL DEFAULT FALSE,\n      joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),\n      PRIMARY KEY (user_id, group_id)\n    );\n    \n    CREATE TABLE IF NOT EXISTS blog_posts (\n      id SERIAL PRIMARY KEY,\n      title TEXT NOT NULL,\n      content TEXT NOT NULL,\n      author_id INTEGER NOT NULL REFERENCES users(id),\n      image_url TEXT,\n      is_published BOOLEAN NOT NULL DEFAULT TRUE,\n      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()\n    );\n    \n    CREATE TABLE IF NOT EXISTS daily_challenges (\n      id SERIAL PRIMARY KEY,\n      title TEXT NOT NULL,\n      description TEXT NOT NULL,\n      points INTEGER NOT NULL,\n      active BOOLEAN NOT NULL DEFAULT TRUE,\n      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()\n    );\n    \n    CREATE TABLE IF NOT EXISTS user_challenges (\n      user_id INTEGER NOT NULL REFERENCES users(id),\n      challenge_id INTEGER NOT NULL REFERENCES daily_challenges(id),\n      completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),\n      PRIMARY KEY (user_id, challenge_id)\n    );\n    \n    CREATE TABLE IF NOT EXISTS weekly_streaks (\n      id SERIAL PRIMARY KEY,\n      user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),\n      current_streak INTEGER NOT NULL DEFAULT 0,\n      longest_streak INTEGER NOT NULL DEFAULT 0,\n      last_action_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()\n    );\n  ")];
                case 1:
                    // This will create all tables based on schema
                    // We're using direct push instead of migrations for simplicity
                    _a.sent();
                    console.log("✅ Database schema pushed successfully!");
                    // Seed initial data if needed
                    return [4 /*yield*/, seedInitialData(db)];
                case 2:
                    // Seed initial data if needed
                    _a.sent();
                    return [4 /*yield*/, pool.end()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function seedInitialData(db) {
    return __awaiter(this, void 0, void 0, function () {
        var actionTypes, badges, challenges;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("🌱 Checking if initial data needs to be seeded...");
                    return [4 /*yield*/, db.query.actionTypes.findMany()];
                case 1:
                    actionTypes = _a.sent();
                    if (!(actionTypes.length === 0)) return [3 /*break*/, 3];
                    console.log("📝 Seeding action types...");
                    return [4 /*yield*/, db.execute("\n      INSERT INTO action_types (name, points, icon, description)\n      VALUES \n        ('Tr\u1ED3ng c\u00E2y', 50, 'ri-plant-line', 'Tr\u1ED3ng m\u1ED9t c\u00E2y m\u1EDBi'),\n        ('T\u00E1i ch\u1EBF', 15, 'ri-recycle-line', 'T\u00E1i ch\u1EBF r\u00E1c th\u1EA3i'),\n        ('Ti\u1EBFt ki\u1EC7m n\u0103ng l\u01B0\u1EE3ng', 10, 'ri-lightbulb-flash-line', 'Ti\u1EBFt ki\u1EC7m \u0111i\u1EC7n v\u00E0 n\u01B0\u1EDBc'),\n        ('Ph\u01B0\u01A1ng ti\u1EC7n c\u00F4ng c\u1ED9ng', 20, 'ri-bus-line', 'S\u1EED d\u1EE5ng ph\u01B0\u01A1ng ti\u1EC7n c\u00F4ng c\u1ED9ng thay v\u00EC xe c\u00E1 nh\u00E2n'),\n        ('D\u1ECDn r\u00E1c', 25, 'ri-delete-bin-line', 'D\u1ECDn r\u00E1c \u1EDF khu v\u1EF1c c\u00F4ng c\u1ED9ng');\n    ")];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, db.query.badges.findMany()];
                case 4:
                    badges = _a.sent();
                    if (!(badges.length === 0)) return [3 /*break*/, 6];
                    console.log("🏆 Seeding badges...");
                    return [4 /*yield*/, db.execute("\n      INSERT INTO badges (name, description, level, icon, required_points)\n      VALUES \n        ('T\u00E2n binh xanh', 'B\u1EAFt \u0111\u1EA7u h\u00E0nh tr\u00ECnh b\u1EA3o v\u1EC7 m\u00F4i tr\u01B0\u1EDDng', 'Leaf', 'ri-leaf-line', 0),\n        ('Ng\u01B0\u1EDDi b\u1EA3o v\u1EC7', '\u0110\u00E3 t\u00EDch l\u0169y 500 \u0111i\u1EC3m', 'Sapling', 'ri-plant-line', 500),\n        ('Chi\u1EBFn binh m\u00F4i tr\u01B0\u1EDDng', '\u0110\u00E3 t\u00EDch l\u0169y 1000 \u0111i\u1EC3m', 'Tree', 'ri-forest-line', 1000);\n    ")];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, db.query.dailyChallenges.findMany()];
                case 7:
                    challenges = _a.sent();
                    if (!(challenges.length === 0)) return [3 /*break*/, 9];
                    console.log("🎯 Seeding daily challenges...");
                    return [4 /*yield*/, db.execute("\n      INSERT INTO daily_challenges (title, description, points, active)\n      VALUES \n        ('Ti\u1EBFt ki\u1EC7m n\u01B0\u1EDBc', 'Gi\u1EA3m l\u01B0\u1EE3ng n\u01B0\u1EDBc s\u1EED d\u1EE5ng h\u00F4m nay', 15, true),\n        ('\u0110i b\u1ED9 ho\u1EB7c \u0111\u1EA1p xe', 'Kh\u00F4ng s\u1EED d\u1EE5ng ph\u01B0\u01A1ng ti\u1EC7n x\u1EA3 kh\u00F3i', 20, true),\n        ('Thu gom r\u00E1c th\u1EA3i nh\u1EF1a', 'Thu gom \u00EDt nh\u1EA5t 10 chai nh\u1EF1a \u0111\u1EC3 t\u00E1i ch\u1EBF', 25, true);\n    ")];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    console.log("✅ Initial data seeding completed!");
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error("❌ Error during database schema push:", err);
    process.exit(1);
});
