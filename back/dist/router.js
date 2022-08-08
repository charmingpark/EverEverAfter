"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const tslib_1 = require("tslib");
const trpc = tslib_1.__importStar(require("@trpc/server"));
const zod_1 = require("zod");
const userSchema = zod_1.z.object({ name: zod_1.z.string().min(5) });
let fakeDB = [];
exports.appRouter = trpc
    .router()
    .query('getUsers', {
    async resolve() {
        return fakeDB;
    },
})
    .mutation('createUser', {
    input: userSchema,
    async resolve({ input }) {
        fakeDB = [...fakeDB, input];
    },
})
    .mutation('clearUser', {
    input: zod_1.z.object({}),
    async resolve() {
        fakeDB = [];
    },
});
//# sourceMappingURL=router.js.map