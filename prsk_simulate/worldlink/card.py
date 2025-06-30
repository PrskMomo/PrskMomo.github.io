import os
import json
import customtkinter

FONT_TYPE = "meiryo"

TYPE = ["Cute", "Cool", "Pure", "Happy", "Mysterious"]

dict = {
    "Virtual": ["Miku", "Rin", "Len", "Luka", "Meiko", "Kaito"],
    "Leo": ["Ichika", "Saki", "Honami", "Shiho"],
    "Mmj": ["Minori", "Haruka", "Airi", "Shizuku"],
    "Vivid": ["Kohane", "An", "Akito", "Toya"],
    "Wonder": ["Tsukasa", "Emu", "Nene", "Rui"],
    "25": ["Kanade", "Mafuyu", "Ena", "Mizuki"]
}

class App(customtkinter.CTk):
    def __init__(self):
        super().__init__()

        # メンバー変数の設定
        self.fonts = (FONT_TYPE, 15)
        # フォームサイズ設定
        self.geometry("400x220")
        self.title("Project SEKAI Card Registry")

        # フォームのセットアップをする
        self.setup_form()
        
    
    def setup_form(self):
        def selected(event):
            name_box.configure(values=dict[group_box.get()])
            name_box.set(dict[group_box.get()][0])

        def submit():
            data = {}
            data[card_id_box.get()] = {}
            data[card_id_box.get()]["Name"] = name_box.get()
            data[card_id_box.get()]["Group"] = group_box.get()
            data[card_id_box.get()]["Type"] = type_box.get()
            data[card_id_box.get()]["Rarity"] = rare.get()
            data[card_id_box.get()]["Performance"] = int(perform_box.get())
            data[card_id_box.get()]["ImageLink"] = f'../images/cards/{group_box.get().lower()}/{name_box.get().lower()}/{image_box.get()}.png'

            with open("./web/prsk_simulate/worldlink/member_db.json", mode="a+") as f:
                if os.path.getsize("./web/prsk_simulate/worldlink/member_db.json") == 0:
                    f.write('[\n\t' + json.dumps(data) + '\n]')

                else:
                    f.seek(0)
                    txt = f.read().rstrip('\n]')
                    f.truncate(0)
                    f.write(txt)
                    f.write(',\n\t' + json.dumps(data) + '\n]')
                    
                data = {}
                
                

        # CustomTkinter のフォームデザイン設定
        customtkinter.set_appearance_mode("dark")  # Modes: system (default), light, dark
        customtkinter.set_default_color_theme("blue")

        card_id = customtkinter.CTkLabel(master=self, text="Card ID")
        card_id_box = customtkinter.CTkEntry(master=self, width=100, justify=customtkinter.CENTER)

        type = customtkinter.CTkLabel(master=self, text="Type")
        type_box = customtkinter.CTkComboBox(master=self, values=TYPE, width=120)
        
        group = customtkinter.CTkLabel(master=self, text="Group")
        group_box = customtkinter.CTkComboBox(master=self, values=list(dict.keys()), command=selected, width=100)
        
        name = customtkinter.CTkLabel(master=self, text="Name")
        name_box = customtkinter.CTkComboBox(master=self, values=dict[group_box.get()], width=120)

        rare = customtkinter.IntVar()
        rare.set(1)

        rare1 = customtkinter.CTkRadioButton(master=self, text="★１", variable=rare, value=1)
        rare2 = customtkinter.CTkRadioButton(master=self, text="★２", variable=rare, value=2)
        rare3 = customtkinter.CTkRadioButton(master=self, text="★３", variable=rare, value=3)
        rare4 = customtkinter.CTkRadioButton(master=self, text="★４", variable=rare, value=4)
        rare5 = customtkinter.CTkRadioButton(master=self, text="Birth Day", variable=rare, value=5)

        perform = customtkinter.CTkLabel(master=self, text="Performance")
        perform_box = customtkinter.CTkEntry(master=self, width=100, justify=customtkinter.CENTER)

        image = customtkinter.CTkLabel(master=self, text="Image")
        image_box = customtkinter.CTkEntry(master=self, width=100, justify=customtkinter.CENTER)

        btn = customtkinter.CTkButton(master=self, text="Submit", width=75, command=submit)


        card_id.place(x=20, y=20)
        card_id_box.place(x=80, y=20)

        type.place(x=200, y=20)
        type_box.place(x=250, y=20)

        group.place(x=20, y=60)
        group_box.place(x=80, y=60)

        name.place(x=200, y=60)
        name_box.place(x=250, y=60)

        rare1.place(x=20, y=105)
        rare2.place(x=90, y=105)
        rare3.place(x=160, y=105)
        rare4.place(x=230, y=105)
        rare5.place(x=300, y=105)

        perform.place(x=20, y=140)
        perform_box.place(x=110, y=140)

        image.place(x=225, y=140)
        image_box.place(x=270, y=140)

        btn.place(x=293, y=180)
    
        



    
    
    


if __name__ == "__main__":
    # アプリケーション実行
    app = App()
    app.mainloop()