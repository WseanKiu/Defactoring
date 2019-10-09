export function getTasks(url, user_id) {
    return fetch(url, {
        method: "post",
        header: {
            Accept: "application/json",
            "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
            user_id: user_id
        })
    })
}

export function GetNotification(url, user_code) {
    return fetch(url, {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
          user_code: user_code
        })
      })
}

export function AcceptTask(url, task_id, subtask_id, user_id, user_code, notif_id, notif_to) {
    return fetch(url, {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "applicantion/json"
      },
      body: JSON.stringify({
        task_id: task_id,
        subtask_id: subtask_id,
        user_id: user_id,
        user_code: user_code,
        notif_id: notif_id,
        notif_to: notif_to
      })
    })
}

export function AddUserTask(url, user_id, task_name, desc, due_date) {
    return fetch(url, {
        method: "post",
        header: {
            Accept: "application/json",
            "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
            user_id: user_id,
            task_name: task_name,
            task_description: desc,
            time: due_date,
        })
    })
}

export function AddTask(url, user_id, name, desc, due, type) {
    return fetch(url, {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "applicantion/json"
      },
      body: JSON.stringify({
        user_id: user_id,
        task_name: name,
        task_description: desc,
        task_dueDate: due,
        task_type: type
      })
    })
}

export function checkDaily(url, id) {
    return fetch(url, {
        method: "post",
        header: {
            Accept: "application/json",
            "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
}

export function ChangePass(url, user_id, new_pass) {
    return fetch(url, {
        method: "post",
        header: {
            Accept: "application/json",
            "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
            user_id: this.state.user_id,
            new_pass: this.state.password2
        })
    })
}

export function updateUserInfo(url, user_id, f_name, l_name, email, contact, birthdate) {
    return fetch(url, {
        method: 'post',
        header: {
            'Accept': 'application/json',
            'Content-type': 'applicantion/json'
        },
        body: JSON.stringify({
            user_id: user_id,
            fname: f_name,
            lname: l_name,
            email: email,
            contact: contact,
            birthdate: birthdate
        })
    })
}

export function FeedBack(url, user_id, content) {
    return fetch(url, {
        method: "post",
        header: {
            Accept: "application/json",
            "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
            user_id: this.state.user_id,
            content: this.state.content
        })
    })
}