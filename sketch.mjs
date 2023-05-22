const sketch = `;©2022 Some Cho
;This work is licensed under the terms of the MIT license.  
;For a copy, see <https://opensource.org/licenses/MIT>.
;AUTHOR: Some Cho
;TITLE: Triangle Abyss - Genuary 1, 2022 Submission

(def TAU 6.2831855)

(defn polygon
  "Returns a list of 2D vertices of a regular polygon."
  [x y radius num-sides & offset-radians]
  (let [step (/ TAU num-sides)
        offset (first offset-radians)]
    (->> (range num-sides)
         (map #(* % step))
         (map #(+ % offset))
         (map #(let [vx (-> (Math/cos %) (* radius) (+ x))
                     vy (-> (Math/sin %) (* radius) (+ y))]
                 [vx vy])))))

(defn draw-polygon 
  "uses beginShape/endShape to draw the polygon."
  [poly]
  (js/beginShape)
  (doseq [v poly]
    (apply js/vertex v))
  (js/endShape js/CLOSE))

(defn setup []
  (js/createCanvas 600 600)
  (js/noStroke))

(defn draw []
  (js/background 0)
  (let [num-tris 500
        t (* 0.00025 (js/millis))]
    (doseq [i (range num-tris)]
      (let [tx (-> t (* 0.5))
            ty (-> t (* 0.5))
            offset (-> (js/noise (* i 0.002) tx ty) (* TAU))
            r (* (- num-tris i) 1)
            x (* js/width 0.5)
            y (* js/height 0.5)]
        (js/fill (* 255 (/ i num-tris)))
        (-> (polygon x y r 3 offset)
            (draw-polygon))))))
`

export default sketch;
