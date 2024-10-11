const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
let firstId;
let secondId;
let timeStamp;
chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  test("1. Test GET with only a project name", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/issues/fcc-project")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        done();
      });
  });
  test("2. Test GET with no project name", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/issues/")
      .end((err, res) => {
        assert.equal(res.status, 404);

        done();
      });
  });
  test("3. Test GET with an id specified", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/issues/apitest?_id=649c8fa0818bd97d9a47b9b6")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 1);
        done();
      });
  });
  test("4. Test GET with one parameter", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get("/api/issues/fcc-project?issue_title=Test")
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.include(res.body[0], { issue_title: "Test" });
        done();
      });
  });
  test("5. Test POST with required parameters", (done) => {
    const sendObj = {
      issue_title: "Test",
      issue_text: "Testing here",
      created_by: "Testers",
    };
    chai
      .request(server)
      .keepOpen()
      .post("/api/issues/fcc-project")
      .type("form")
      .send(sendObj)
      .end((err, res) => {
        firstId = res.body._id;
        assert.equal(res.status, 200);
        assert.include(res.body, sendObj);
        done();
      });
  });
  test("6. Test POST with all parameters", (done) => {
    const sendObj = {
      issue_title: "Test",
      issue_text: "Testing here",
      created_by: "Testers",
      assigned_to: "A tester",
      status_text: "not done",
    };
    chai
      .request(server)
      .keepOpen()
      .post("/api/issues/fcc-project")
      .type("form")
      .send(sendObj)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.include(res.body, sendObj);
        secondId = res.body._id;
        done();
      });
  });
  test("7. Test POST with missing parameters", (done) => {
    const sendObj = {
      issue_text: "Testing here",
      created_by: "Testers",
      assigned_to: "A tester",
      status_text: "not done",
    };
    chai
      .request(server)
      .keepOpen()
      .post("/api/issues/fcc-project")
      .type("form")
      .send(sendObj)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "required field(s) missing" });
        done();
      });
  });
  test("8. Test PUT with valid id", (done) => {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/fcc-project")
      .type("form")
      .send({ _id: secondId, issue_title: "Updated" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          result: "successfully updated",
          _id: secondId,
        });
        done();
      });
  });
  test("9. Test PUT with invalid id", (done) => {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/fcc-project")
      .type("form")
      .send({ _id: "34545lol", issue_title: "Updated" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: "could not update",
          _id: "34545lol",
        });
        done();
      });
  });
  test("10. Test PUT with id and no parameter", (done) => {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/fcc-project")
      .type("form")
      .send({ _id: "34545lol" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: "no update field(s) sent",
          _id: "34545lol",
        });
        done();
      });
  });
  test("11. Test PUT with no id", (done) => {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/fcc-project")
      .type("form")
      .send({ issue_text: "34545lol" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: "missing _id" });
        done();
      });
  });

  test("12. Test DELETE with invalid id", (done) => {
    chai
      .request(server)
      .keepOpen()
      .delete("/api/issues/fcc-project")
      .type("form")
      .send({ _id: "lolinvalidid" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          error: "could not delete",
          _id: res.body._id,
        });
        done();
      });
  });
  test("13. Test DELETE with valid id", (done) => {
    chai
      .request(server)
      .keepOpen()
      .delete("/api/issues/fcc-project")
      .type("form")
      .send({ _id: firstId })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          result: "successfully deleted",
          _id: firstId,
        });
        done();
      });
  });
  test("14. Test if timestamp got updated", (done) => {
    chai
      .request(server)
      .keepOpen()
      .get(`/api/issues/fcc-project?_id=${secondId}`)
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.notEqual(res.body[0].created_on, res.body[0].updated_on);
        done();
      });
  });

  test("15. Test PUT with open parameter", (done) => {
    chai
      .request(server)
      .keepOpen()
      .put("/api/issues/fcc-project")
      .type("form")
      .send({ open: false, _id: secondId })
      .end((err, res) => {
        assert.equal(res.status, 200);
        chai
          .request(server)
          .keepOpen()
          .get(`/api/issues/fcc-project?_id=${secondId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.include(res.body[0], { open: false });
            done();
          });
      });
  });
});
