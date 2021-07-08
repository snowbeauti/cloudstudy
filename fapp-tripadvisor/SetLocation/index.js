module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "희망여행지, " + name + "(이)가 등록되었습니다."
        : "여행지 미입력됨";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}